package com.hub.accommodation.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Configuration
public class UserDetailsHashMap {

    private final Map<String, String> storage = new HashMap<>();

    public UserDetailsHashMap() {
        storage.put("Vlad", "sly");
        storage.put("Vlad2", "sly2");
    }

    private UserDetails mapper(Map.Entry<String, String> entry){
        return User.withDefaultPasswordEncoder()
                .username(entry.getKey())
                .password(entry.getValue())
                .authorities(Arrays.asList())
                .build();
    }

    @Bean
    public UserDetailsService uds() {
        return new InMemoryUserDetailsManager(
                storage.entrySet().stream().map(this::mapper).collect(Collectors.toList())
        );
    }
}




