package com.hub.accommodation.DTO.response.error;

import com.hub.accommodation.util.Violation;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ValidationErrorResponse {
    private List<Violation> violations;
}