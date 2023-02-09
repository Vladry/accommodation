package com.hub.accommodation.exception;

import com.hub.accommodation.exception.groups.HandledNotConfidentialException;

public class CreatingEntityFailed extends HandledNotConfidentialException {

    //образец выброса этих ислючений в сервисах:  new CreatingEntityFailed("user in UserController::findUserByEmail" + email));)
    public CreatingEntityFailed(String entityName) {
        super(String.format("Error: failed to create %s", entityName));
    }
    public CreatingEntityFailed(String entityName, String identifier) {
        super(String.format("Error: failed to create %s by identifier: %s", entityName, identifier));
    }
}