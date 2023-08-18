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
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
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
        return authService.authenticate(request.getEmail(), request.getPassword());

    }

    @PostMapping("${api.ver}/auth/logout")
    public void logout() {
        String user = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        log.info("a user " +  user  + " logged out");
    }


//    @CrossOrigin(origins = "*") // -без неё не проходят работают запросы из браузера (из постмена работают)
    @Validated(OnCreate.class) //основная регистрация нового пользователя
    @PostMapping("${api.ver}/auth/register")
    public ResponseEntity<?> register(@RequestBody @Valid UserDbRqDto userRqDto) {
        return authService.register(userRqDto);

    }


    @GetMapping("${api.ver}/auth/refresh")
    public ResponseEntity<?> refresh(@RequestHeader("Refresh-token") String token) {
            return authService.refresh(token);
    }
}