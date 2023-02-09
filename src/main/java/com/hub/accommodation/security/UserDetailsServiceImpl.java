package com.hub.accommodation.security;

import com.hub.accommodation.domain.user.User;
import com.hub.accommodation.exception.UserLoginException;
import com.hub.accommodation.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository
                .findUserByEmail(email)
                .orElseThrow(UserLoginException::new); //throwing a classified-type exception
//                .orElseThrow(() -> new UsernameNotFoundException("Username " + email + " not found"));  //throwing a non-classified-type exception

        return SecurityUser.fromUser(user);
    }
}
