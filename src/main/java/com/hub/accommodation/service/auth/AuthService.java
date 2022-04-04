package com.hub.accommodation.service.auth;

import com.hub.accommodation.domain.User;
import com.hub.accommodation.domain.RefreshToken;
import com.hub.accommodation.exception.JwtAuthenticationException;
import com.hub.accommodation.exception.NoDataFoundException;
import com.hub.accommodation.exception.UserAlreadyExistException;
import com.hub.accommodation.repository.UserRepository;
import com.hub.accommodation.repository.RefreshTokenRepository;
import com.hub.accommodation.security.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository appUserRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(AuthenticationManager authenticationManager, UserRepository appUserRepository, JwtTokenProvider jwtTokenProvider, RefreshTokenRepository refreshTokenRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.appUserRepository = appUserRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Value("${jwt.expirationRefresh}")
    private long validityRefreshToken;

    public RefreshToken readRefreshToken(Long id) throws JwtAuthenticationException {
        return refreshTokenRepository.findById(id).orElseThrow(() -> new JwtAuthenticationException("refreshToken not found", HttpStatus.FORBIDDEN));
    }

    public RefreshToken createRefreshToken(User appUser) {
        return refreshTokenRepository.save(new RefreshToken(validityRefreshToken, appUser));
    }

    public void markUsed(Long id) {
        refreshTokenRepository.findById(id)
                .map(t -> {
                    t.setIsUsed(true);
                    return refreshTokenRepository.save(t);
                })
                .orElseThrow(() -> new NoDataFoundException("refreshToken", id));
    }

    // FIXME
    public Map<Object, Object> createTokens(User o) {
        String token = jwtTokenProvider.createToken(o.getEmail(), "USER", o.getId());

        RefreshToken createdRefreshToken = this.createRefreshToken(o);
        String refreshToken = jwtTokenProvider.createRefreshToken(createdRefreshToken.getId());

        Map<Object, Object> tokens = new HashMap<>();
        tokens.put("userId", o.getId());
        tokens.put("token", token);
        tokens.put("refreshToken", refreshToken);
        return tokens;
    }

    public Map<Object, Object> authenticate(String email, String password) {
        User appUser = appUserRepository.findUserByEmail(email).orElseThrow(() -> new NoDataFoundException("AppUser doesn't exists"));
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        return createTokens(appUser);
    }

    public Map<Object, Object> register(String email, String password) {
        if (appUserRepository.findUserByEmail(email).isPresent()) {
            throw new UserAlreadyExistException(email);
        }

        appUserRepository.save(new User(email, passwordEncoder.encode(password)));
        return authenticate(email, password);
    }

    public Map<Object, Object> refresh(String refreshToken) throws JwtAuthenticationException {
        Long refreshTokenId = jwtTokenProvider.getRefreshTokenId(refreshToken);
        RefreshToken rt = readRefreshToken(refreshTokenId);

        if (rt.getExpirationDate().before(new Date()) || rt.getIsUsed()) {
            throw new JwtAuthenticationException("refreshToken is expired", HttpStatus.UNAUTHORIZED);
        } else {
            markUsed(refreshTokenId);
            User appUser = appUserRepository.findById(rt.getUser().getId()).orElseThrow(() -> new NoDataFoundException("User doesn't exists"));
            return createTokens(appUser);
        }
    }
}
