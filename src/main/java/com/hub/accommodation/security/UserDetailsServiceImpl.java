package com.hub.accommodation.security;

import com.hub.accommodation.domain.Owner;
import com.hub.accommodation.repository.OwnerRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final OwnerRepository ownerRepository;

    public UserDetailsServiceImpl(OwnerRepository ownerRepository) {
        this.ownerRepository = ownerRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Owner owner = ownerRepository
                .findOwnerByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Username " + email + " not found"));

        return SecurityUser.fromOwner(owner);
    }
}
