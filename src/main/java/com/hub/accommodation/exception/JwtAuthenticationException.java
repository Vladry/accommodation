package com.hub.accommodation.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import javax.naming.AuthenticationException;

@Getter
public class JwtAuthenticationException extends AuthenticationException {

    public JwtAuthenticationException(String message){
        super(message);
    }

    public JwtAuthenticationException(String message, HttpStatus status){
        super(String.format("%s, with status: %s", message, status));
    }
}