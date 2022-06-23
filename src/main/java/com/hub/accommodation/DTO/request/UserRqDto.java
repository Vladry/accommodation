package com.hub.accommodation.DTO.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hub.accommodation.domain.user.enums.Role;
import lombok.Data;

import javax.persistence.Temporal;
import java.util.Date;

import static javax.persistence.TemporalType.TIMESTAMP;


@Data
public class UserRqDto {
//    private final String passwordRegexp = "^(?=.*[0_9])(?=.*[a_z])(?=.*[A_Z])(?=.*[@#$%^&_+=()])(?=\\S+$).{8,20}$";

//    @Size(min = 3, message = "")
//    @Size(max = 25, message = "")
//    @NonNull
    String name = "";
//    @Size(min = 3, message = "")
//    @Size(max = 25, message = "")
    String lastName = "";
//    @Email
//    @NonNull
    String email = "";
//    @NonNull
    String password = "";
    String phoneNumber = "";
    String urlSocial1 = "";
    String urlSocial2 = "";
    String messenger1 = "";
    String messenger2 = "";
    String avatar = "";
    boolean hideSocialContactData = false;
    boolean datingServiceParticipation = false;
    private String role;
}
