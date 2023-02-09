package com.hub.accommodation.exception;

import com.hub.accommodation.exception.groups.HandledNotConfidentialException;

public class UserAlreadyExistException extends HandledNotConfidentialException {

    public UserAlreadyExistException(String entityName) {
            super(String.format("Error: %s already exists", entityName));
        }
    public UserAlreadyExistException(String entityName, String identifier) {
            super(String.format("Error: %s already exists by identifier: %s", entityName, identifier));
        }
}
