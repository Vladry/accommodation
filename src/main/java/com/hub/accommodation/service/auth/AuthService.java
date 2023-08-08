package com.hub.accommodation.service.auth;

import com.hub.accommodation.dto.request.UserDbRqDto;
import com.hub.accommodation.domain.auth.RefreshToken;
import com.hub.accommodation.domain.user.UserDB;
import com.hub.accommodation.exception.JwtAuthenticationException;
import com.hub.accommodation.exception.NoDataFoundException;
import com.hub.accommodation.exception.UserAlreadyExistException;
import com.hub.accommodation.facade.UserFacade;
import com.hub.accommodation.repository.RefreshTokenRepository;
import com.hub.accommodation.repository.UserRepository;
import com.hub.accommodation.security.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserFacade userFacade;

    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository, JwtTokenProvider jwtTokenProvider, RefreshTokenRepository refreshTokenRepository, PasswordEncoder passwordEncoder, UserFacade userFacade) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.userFacade = userFacade;
    }

    @Value("${jwt.refreshTokenExpiration}")
    private long refreshTokenExpiration;
    @Value("${jwt.accessTokenExpiration}")
    private long accessTokenExpiration;

    public RefreshToken readRefreshTokenEntity(Long id) throws JwtAuthenticationException {
        return refreshTokenRepository.findById(id).orElseThrow(() -> new JwtAuthenticationException("refreshToken not found", HttpStatus.FORBIDDEN));
    }

    public RefreshToken createRefreshTokenEntity(UserDB user) {
        return refreshTokenRepository.save(new RefreshToken(refreshTokenExpiration, user));
    }

    public void markUsed(Long id) {
        refreshTokenRepository.findById(id)
                .map(t -> {
                    t.setIsUsed(true);
                    return refreshTokenRepository.save(t);
                })
                .orElseThrow(() -> new NoDataFoundException("refreshToken in AuthService::markUsed"));
    }

    public Map<Object, Object> createTokens(UserDB o) {
        String token = jwtTokenProvider.createAccessTokenStr(o.getEmail(), o.getRole().name(), o.getId());
        RefreshToken createdRefreshToken = this.createRefreshTokenEntity(o);
        String refreshToken = jwtTokenProvider.createRefreshTokenStr(createdRefreshToken.getId());
        Instant now = Instant.now();
        Map<Object, Object> tokens = new HashMap<>();
        tokens.put("userId", o.getId());
        tokens.put("token", token);
        tokens.put("tokenExpiry", Date.from(now.plus(accessTokenExpiration, ChronoUnit.SECONDS)));
        tokens.put("refreshToken", refreshToken);
        return tokens;
    }

    public Map<Object, Object> authenticate(String email, String password) throws NoDataFoundException {
        System.out.println("in AuthService-> authenticate(String email, String password)");
        System.out.println("args String email, String password: " + email + ", " + password);

        UserDB user = userRepository.findUserByEmail(email).orElseThrow(() -> new NoDataFoundException("user in AuthService::authenticate"));
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        return createTokens(user);
    }

    Authentication auth = SecurityContextHolder.getContext().getAuthentication();

    Authentication auth1 = SecurityContextHolder.getContext().getAuthentication();

    public Map<Object, Object> register(UserDbRqDto userRqDto) {
        String originalPassword = userRqDto.getPassword();
        UserDB newUser = userFacade.convertToEntity(userRqDto);
        String email = newUser.getEmail();
        if (userRepository.findUserByEmail(email).isPresent()) {
            throw new UserAlreadyExistException("user AuthService::register", email);
        } else {
            userRepository.save(newUser);
            return authenticate(newUser.getEmail(), originalPassword); //сюда вернулся  Map<o,o> tokens -токенов
        }
    }


    public Map<Object, Object> refresh(String refreshToken) throws JwtAuthenticationException, NoDataFoundException {
        Long refreshTokenId = jwtTokenProvider.getRefreshTokenId(refreshToken);
        RefreshToken rt = readRefreshTokenEntity(refreshTokenId);

        if (rt.getExpirationDate().before(new Date()) || rt.getIsUsed()) {
            throw new JwtAuthenticationException("refreshToken is expired", HttpStatus.UNAUTHORIZED);
        } else {
            markUsed(refreshTokenId);
            UserDB user = userRepository.findById(rt.getUser().getId()).orElseThrow(() -> new NoDataFoundException("user = userRepository.findById  in AuthService::refresh"));
            return createTokens(user);
        }
    }
}
