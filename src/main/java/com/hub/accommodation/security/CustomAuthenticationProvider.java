package com.hub.accommodation.security;


import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
    public class CustomAuthenticationProvider implements AuthenticationProvider {

        @Override
        public Authentication authenticate(Authentication authentication) throws AuthenticationException {
            System.out.println("in CustomAuthenticationProvider-> authenticate(authentication)");
            System.out.println("arg authentication: " + authentication);
            String name = authentication.getName();
            String password = authentication.getCredentials().toString();
                return new UsernamePasswordAuthenticationToken(
                        name, password, new ArrayList<>());

        }

        @Override
        public boolean supports(Class<?> authentication) {
            return authentication.equals(UsernamePasswordAuthenticationToken.class);
        }
    }

