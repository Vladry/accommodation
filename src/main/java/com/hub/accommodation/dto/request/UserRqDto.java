package com.hub.accommodation.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRqDto {
//    private final String passwordRegexp = "^(?=.*[0_9])(?=.*[a_z])(?=.*[A_Z])(?=.*[@#$%^&_+=()])(?=\\S+$).{8,20}$";

//    @Size(min = 3, message = "")
//    @Size(max = 25, message = "")
//    @NonNull
    private String name = "";
//    @Size(min = 3, message = "")
//    @Size(max = 25, message = "")
    private String lastName = "";
//    @Email
//    @NonNull
    private String email = "";
//    @NonNull
    private String password = "";
    private String phoneNumber = "";
    private String urlSocial1 = "";
    private String urlSocial2 = "";
    private String messenger1 = "";
    private String messenger2 = "";
    private String avatar = "";
    boolean hideSocialContactData = false;
    boolean datingServiceParticipation = false;
    private String role;
    private String location = "";
}
