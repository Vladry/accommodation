package com.hub.accommodation.domain.user.enums;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public enum Role {
    USER(new HashSet<>(List.of(Permission.READ, Permission.WRITE))),
    ADMIN(new HashSet<>(List.of(Permission.READ, Permission.WRITE))),
    GUEST(new HashSet<>(List.of(Permission.READ, Permission.WRITE))),
    MODERATOR(new HashSet<>(List.of(Permission.READ, Permission.WRITE)));

    private final Set<Permission> permissions;

    Role(Set<Permission> permissions) {
        this.permissions = permissions;
    }

    public Set<Permission> getPermissions() {
        return permissions;
    }

    public Set<SimpleGrantedAuthority> getAuthorities(){
        return getPermissions().stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toSet());
    }
}