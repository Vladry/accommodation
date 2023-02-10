package com.hub.accommodation.domain.user.enums;

public enum Permission {
    GUEST_ACCESS("guest_access"),
    GENERAL("general"),
    ACCOMMODATION("accommodation"),
    DATING("dating"),
    VOLUNTEERING("volunteering"),
    ADMINISTRATION("administration"),
    MODERATION("moderation");

    private final String permission;

    Permission(String permission){
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}