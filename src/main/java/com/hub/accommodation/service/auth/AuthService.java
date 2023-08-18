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
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
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
        String accessToken = jwtTokenProvider.createAccessTokenStr(o.getEmail(), o.getRole().name(), o.getId());
        RefreshToken createdRefreshToken = this.createRefreshTokenEntity(o);
        String refreshToken = jwtTokenProvider.createRefreshTokenStr(createdRefreshToken.getId());
        Instant now = Instant.now();
        Map<Object, Object> tokens = new HashMap<>();
        tokens.put("userId", o.getId());
        tokens.put("accessToken", accessToken);
        tokens.put("tokenExpiry", Date.from(now.plus(accessTokenExpiration, ChronoUnit.SECONDS)));
        tokens.put("refreshToken", refreshToken);
        return tokens;
    }


    public ResponseEntity<?> authenticate(String email, String password) {
        System.out.println("in AuthService-> authenticate(String email, String password)");
        System.out.println("args String email, String password: " + email + ", " + password);

        UserDB user = userRepository.findUserByEmail(email).orElseThrow(() -> new NoDataFoundException("user in AuthService::authenticate"));
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        Map<Object, Object> tokens = createTokens(user);

        // https://reflectoring.io/spring-boot-cookies/
        ResponseCookie userIdSpringCookie = ResponseCookie.from("userId", tokens.get("userId").toString())
                .httpOnly(false)
                .secure(true)
                .maxAge(refreshTokenExpiration)
                .build();
        ResponseCookie tokenSpringCookie = ResponseCookie.from("accessToken", tokens.get("accessToken").toString())
                .httpOnly(true)
                .secure(true)
                .maxAge(accessTokenExpiration)
                .build();
        ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", tokens.get("refreshToken").toString())
                .httpOnly(true)
                .secure(true)
                .maxAge(refreshTokenExpiration)
                .build();


        try {
            log.info("user: " + email + " logged in");
            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, userIdSpringCookie.toString(), tokenSpringCookie.toString(), refreshTokenCookie.toString())
                    .body(tokens); //если есть body -то закрываем цепочку .body(....), если нет тела- закрываем цепочку:  .build();

        } catch (AuthenticationException | NoDataFoundException e) {

            log.error("error logging a user");
            return new ResponseEntity<>("Invalid email/password combination", HttpStatus.FORBIDDEN);
        }


    }

    public ResponseEntity<?> register(UserDbRqDto userRqDto) {
        try {
            String originalPassword = userRqDto.getPassword();
            UserDB newUser = userFacade.convertToEntity(userRqDto);
            String email = newUser.getEmail();
            if (userRepository.findUserByEmail(email).isPresent()) {
                throw new UserAlreadyExistException("user AuthService::register", email);
            } else {
                userRepository.save(newUser);
                log.info("registering a new user");
                return new ResponseEntity<>(authenticate(newUser.getEmail(), originalPassword), HttpStatus.CREATED);
            }
        } catch (AuthenticationException | UserAlreadyExistException e) {
            log.error("new user registration error");
            return new ResponseEntity<>("new user registration error" + e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        }
    }


    public ResponseEntity<?> refresh(String refreshToken) {
        Map<Object, Object> tokens;
        try {
            Long refreshTokenId = jwtTokenProvider.getRefreshTokenId(refreshToken);
            RefreshToken rt = readRefreshTokenEntity(refreshTokenId);

            if (rt.getExpirationDate().before(new Date()) || rt.getIsUsed()) {
                throw new JwtAuthenticationException("refreshToken is expired", HttpStatus.UNAUTHORIZED);
            } else {
                markUsed(refreshTokenId);
                UserDB user = userRepository.findById(rt.getUser().getId()).orElseThrow(() -> new NoDataFoundException("user = userRepository.findById  in AuthService::refresh"));
                tokens = createTokens(user);
            }
            return ResponseEntity.ok(tokens);

        } catch (JwtAuthenticationException | NoDataFoundException e) {
            return new ResponseEntity<>("JWT accessToken is expired or invalid", HttpStatus.FORBIDDEN);
        }


    }
}
