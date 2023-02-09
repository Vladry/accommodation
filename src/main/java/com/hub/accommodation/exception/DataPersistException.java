package com.hub.accommodation.exception;

import com.hub.accommodation.exception.groups.HandledNotConfidentialException;

public class DataPersistException extends HandledNotConfidentialException {

    public DataPersistException(String entityName) {
        super(String.format("Error: %s can't be persisted", entityName));
    }
    public DataPersistException(String entityName, String identifier) {
        super(String.format("Error: %s can't be persisted by identifier: %s", entityName, identifier));
    }

}
