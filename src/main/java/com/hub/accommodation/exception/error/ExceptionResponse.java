package com.hub.accommodation.exception.error;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@RequiredArgsConstructor
public class ExceptionResponse {
    // example of the required exceptionMsg format:  "UserController::findUserByEmail-> no User found by email: " + email
    private String messageForTheClient;
    private String originalStatusCode;

    public ExceptionResponse(String exceptionMsg){
        String str = "Error occurred in %s";
        this.messageForTheClient = String.format(str, exceptionMsg);
        log.error(messageForTheClient);
    }

    public ExceptionResponse(String exceptionMsg, String request){
        String str = "Error occurred in %s";
        this.messageForTheClient = String.format(str, exceptionMsg);
        log.error(messageForTheClient);
        this.originalStatusCode = request;
    }

}