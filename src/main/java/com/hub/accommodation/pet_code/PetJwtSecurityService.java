package com.hub.accommodation.pet_code;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class PetJwtSecurityService {

    @Autowired
    AuthenticationManager authManager;

    SecurityContext sc = SecurityContextHolder.getContext();
    Authentication auth = authManager.authenticate(null);
    sc.setAuthentication(auth);
    Object principal = auth.getPrincipal();
    Object credentials = auth.getCredentials();
    Object authorities = auth.getAuthorities();
    Object details = auth.getDetails();
    String username = auth.getName();





}

