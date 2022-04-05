package com.hub.accommodation.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import javax.naming.AuthenticationException;

@Getter
public class JwtAuthenticationException extends AuthenticationException {

    private HttpStatus status;

    public JwtAuthenticationException(String message){
        super(message);
    }

    public JwtAuthenticationException(String message, HttpStatus status){
        super(message);
        this.status = status;
    }
}