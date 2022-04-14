package com.hub.accommodation.DTO.request;

import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.accommodation.enums.Country;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

@Data
public class UserRqDto {
//    private final String passwordRegexp = "^(?=.*[0_9])(?=.*[a_z])(?=.*[A_Z])(?=.*[@#$%^&_+=()])(?=\\S+$).{8,20}$";

//    @Size(min = 3, message = "")
//    @Size(max = 25, message = "")
    String name;
//    @Size(min = 3, message = "")
//    @Size(max = 25, message = "")
    String lastName;
//    @Email
    String email;
    String password;
    String phoneNumber;
    String urlSocial1;
    String urlSocial2;
    String messenger1;
    String messenger2;
//    @Size(min = 3, message = "")
//    @Size(max = 35, message = "")
    String location;
    boolean hideSocialContactData;
    boolean datingServiceParticipation;

}
