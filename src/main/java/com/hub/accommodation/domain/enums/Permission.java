package com.hub.accommodation.domain.enums;

public enum Permission {
    READ("read"),
    WRITE("write"),
    GET_TOTAL("getTotal");

    private final String permission;

    Permission(String permission){
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}