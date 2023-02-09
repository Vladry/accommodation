package com.hub.accommodation.exception;

import com.hub.accommodation.exception.groups.HandledNotConfidentialException;

public class NoDataFoundException extends HandledNotConfidentialException {
    //образец выброса этих ислючений в сервисах:  new NoDataFoundException("user in UserController::findUserByEmail" +email));

    public NoDataFoundException(String entityName) {
        super(String.format("Error: %s not found", entityName));
    }
    public NoDataFoundException(String entityName, String identifier) {
        super(String.format("Error: %s not found by identifier: %s", entityName, identifier));
    }
}