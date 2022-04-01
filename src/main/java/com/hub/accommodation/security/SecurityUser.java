package com.hub.accommodation.security;

import com.hub.accommodation.domain.AppUser;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
public class SecurityUser implements UserDetails {
    private final String username;
    private final String password;
    private final List<SimpleGrantedAuthority> authorities;
    private final Long id;
    private final boolean isActive = true;

    public SecurityUser(String username, String password, List<SimpleGrantedAuthority> authorities, Long id) {
        this.username = username;
        this.password = password;
        this.authorities = authorities;
        this.id = id;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return isActive;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isActive;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isActive;
    }

    @Override
    public boolean isEnabled() {
        return isActive;
    }

    public static UserDetails fromOwner(AppUser owner) {
        return new org.springframework.security.core.userdetails.User(
                owner.getEmail(), owner.getPassword(),
                List.of()
        );
    }
}
