package com.hub.accommodation.security;

import com.hub.accommodation.domain.user.UserDB;
import com.hub.accommodation.exception.UserLoginException;
import com.hub.accommodation.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    public static UserDetails UserDetailsFromUserDB(UserDB user) {
        List<SimpleGrantedAuthority> authorities = user.getRole().getPermissions().stream().map(
                p -> new SimpleGrantedAuthority(p.getPermission())
        ).toList();
        return new User(user.getEmail(), user.getPassword(), authorities);
    }


    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserDB user = userRepository
                .findUserByEmail(email)
                .orElseThrow(UserLoginException::new); //throwing a classified-type exception
        return UserDetailsFromUserDB(user);
    }
}
