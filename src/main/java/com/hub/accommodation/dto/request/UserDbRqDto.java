package com.hub.accommodation.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDbRqDto {
    private final String passwordRegexp = "^(?=.*[0_9])(?=.*[a_z])(?=.*[A_Z])(?=.*[@#$%^&_+=()])(?=\\S+$).{8,20}$";
    private final String phoneRegexp="";

    @Size(min = 3, message = "name must be longer")
    @Size(max = 25, message = "name must be shorter")
    @NotBlank
    private String name;
    private String lastName;
    @Email
    @NotBlank
    private String email;
    @NotBlank
    @Pattern(regexp = passwordRegexp)
    private String password = "";
//    @Pattern(regexp=phoneRegexp)
    private String phoneNumber = "";
    private String urlSocial1 = "";
    private String urlSocial2 = "";
    private String messenger1 = "";
    private String messenger2 = "";
    private String avatar = "";
    boolean hideSocialContactData = false;
    boolean datingServiceParticipation = false;
    private String location = "";
}
