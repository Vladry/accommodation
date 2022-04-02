package com.hub.accommodation.security;

import com.hub.accommodation.domain.AppUser;
import com.hub.accommodation.repository.AppUserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final AppUserRepository appUserRepository;

    public UserDetailsServiceImpl(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AppUser appUser = appUserRepository
                .findAppUserByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Username " + email + " not found"));

        return SecurityUser.fromAppUser(appUser);
    }
}
