package com.hub.accommodation.controller.auth;

import com.hub.accommodation.DTO.request.AuthRequest;
import com.hub.accommodation.DTO.groups.OnCreate;
import com.hub.accommodation.DTO.request.UserRqDto;
import com.hub.accommodation.DTO.response.UserRsDto;
import com.hub.accommodation.domain.user.User;
import com.hub.accommodation.exception.JwtAuthenticationException;
import com.hub.accommodation.service.auth.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Validated
@RestController
@Slf4j
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/api/v1/auth/login")
    public ResponseEntity<?> authenticate(@RequestBody @Valid AuthRequest request) {
        try {
            log.info("a user logged in");
            return ResponseEntity.ok(authService.authenticate(request.getEmail(), request.getPassword()));
        } catch (AuthenticationException e) {
            log.error("error logging a user");
            return new ResponseEntity<>("Invalid email/password combination", HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/api/v1/auth/logout")
    public void logout() {

    }


    @CrossOrigin(origins = "*") // -без неё не проходят работают запросы из браузера (из постмена работают)
    @Validated(OnCreate.class) //основная регистрация нового пользователя
    @PostMapping("/api/v1/auth/register")
    public ResponseEntity<?> register(@RequestBody @Valid UserRqDto userRqDto) {
        try {
            log.info("a new user just registered");
            return ResponseEntity.ok(authService.register(userRqDto));
        } catch (AuthenticationException e) {
            log.error("error registering a new user");
            return new ResponseEntity<>("Error with registration: " + e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }


    @GetMapping("/api/v1/auth/refresh")
    public ResponseEntity<?> refresh(@RequestHeader("Refresh-token") String token) {
        try {
            return ResponseEntity.ok(authService.refresh(token));
        } catch (RuntimeException | JwtAuthenticationException e) {
            return new ResponseEntity<>("JWT token is expired or invalid", HttpStatus.FORBIDDEN);
        }
    }
}