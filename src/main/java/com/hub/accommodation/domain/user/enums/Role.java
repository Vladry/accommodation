package com.hub.accommodation.domain.user.enums;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public enum Role {
    GUEST(new HashSet<>(List.of(Permission.GUEST_ACCESS))),
    USER(new HashSet<>(List.of(Permission.GUEST_ACCESS, Permission.GENERAL))),
    MODERATOR(new HashSet<>(List.of(Permission.GUEST_ACCESS, Permission.GENERAL, Permission.MODERATION))),
    ADMIN(new HashSet<>(List.of(Permission.GUEST_ACCESS, Permission.GENERAL, Permission.MODERATION, Permission.ADMINISTRATION)));

    private final Set<Permission> permissions;

    Role(Set<Permission> permissions) {
        this.permissions = permissions;
    }

    public Set<Permission> getPermissions() {
        return permissions;
    }

/*    public Set<SimpleGrantedAuthority> getAuthorities(){
        return getPermissions().stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toSet());
    }*/
}