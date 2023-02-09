package com.hub.accommodation.controller.exception_handlers;

import com.hub.accommodation.exception.error.ExceptionResponse;
import com.hub.accommodation.exception.*;
import com.hub.accommodation.exception.groups.HandledConfidentialException;
import com.hub.accommodation.exception.groups.HandledNotConfidentialException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Arrays;

@org.springframework.web.bind.annotation.ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({CreatingEntityFailed.class, DataPersistException.class, NoDataFoundException.class, UserAlreadyExistException.class})
    public ResponseEntity<ExceptionResponse> HandledNotConfidentialException(HandledNotConfidentialException ex, WebRequest request) {
        return ResponseEntity.badRequest().body(new ExceptionResponse(ex.getMessage()));
    }

    @ExceptionHandler(HandledConfidentialException.class)
    public ResponseEntity<ExceptionResponse> handleConfidentialExceptions(HandledConfidentialException ex) {
        return new ResponseEntity<>(new ExceptionResponse(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(Throwable.class)
    public ResponseEntity<?> handleOtherRuntimeExceptions(Throwable ex) {
        return ResponseEntity.badRequest().body(new ExceptionResponse(String.format("Error: %s, \nStackTrace: %s", ex.getMessage(), Arrays.toString(ex.getStackTrace()))   ));
    }
}
