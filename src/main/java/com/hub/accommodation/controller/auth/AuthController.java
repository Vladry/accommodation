package com.hub.accommodation.controller.auth;

import com.hub.accommodation.dto.request.AuthRequest;
import com.hub.accommodation.dto.groups.OnCreate;
import com.hub.accommodation.dto.request.UserDbRqDto;
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

    @PostMapping("${api.ver}/auth/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthRequest request) {
        try {
            log.info("a user logged in");
            return ResponseEntity.ok(authService.authenticate(request.getEmail(), request.getPassword()));
        } catch (AuthenticationException e) {
            log.error("error logging a user");
            return new ResponseEntity<>("Invalid email/password combination", HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("${api.ver}/auth/logout")
    public void logout() {

    }


//    @CrossOrigin(origins = "*") // -без неё не проходят работают запросы из браузера (из постмена работают)
    @Validated(OnCreate.class) //основная регистрация нового пользователя
    @PostMapping("/api/v1/auth/register")
    public ResponseEntity<?> register(@RequestBody @Valid UserDbRqDto userRqDto) {
        try {
            log.info("registering a new user");
            return new ResponseEntity<>(authService.register(userRqDto), HttpStatus.CREATED);
        } catch (AuthenticationException e) {
            log.error("error registering a new user");
            return new ResponseEntity<>("Error with registration: NOT_ACCEPTABLE" + e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        }
    }


    @GetMapping("${api.ver}/auth/refresh")
    public ResponseEntity<?> refresh(@RequestHeader("Refresh-token") String token) {
        try {
            return ResponseEntity.ok(authService.refresh(token));
        } catch (RuntimeException | JwtAuthenticationException e) {
            return new ResponseEntity<>("JWT token is expired or invalid", HttpStatus.FORBIDDEN);
        }
    }
}