package com.hub.accommodation.dto.request;

import lombok.Data;

import javax.validation.constraints.Email;

@Data
public class AuthRequest {
//    private final String passwordRegexp = "^(?=.*[0_9])(?=.*[a_z])(?=.*[A_Z])(?=.*[@#$%^&_+=()])(?=\\S+$).{8,20}$";

    @Email
    String email;

//    @Pattern(regexp = passwordRegexp)
    String password;
}
