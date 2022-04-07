package com.hub.accommodation.domain.user.enums;

public enum Permission {
    READ("read"),
    WRITE("write"),
    WRITE_ACCOMMODATION("writeAccommodation"),
    GET_TOTAL("getTotal");

    private final String permission;

    Permission(String permission){
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}