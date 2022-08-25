package com.hub.accommodation.exception;

public class CreatingEntityFailed extends RuntimeException {
    public CreatingEntityFailed(String message){
        super(String.format("Error creating an Entity: %s", message));
    }
}
