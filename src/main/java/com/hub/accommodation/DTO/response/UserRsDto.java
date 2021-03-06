package com.hub.accommodation.DTO.response;

import com.hub.accommodation.domain.accommodation.Accommodation;
import com.hub.accommodation.domain.BaseEntity;
import lombok.Data;

import java.util.Set;

@Data
public class UserRsDto extends BaseEntity {


    String name;
    String lastName;
    String email;
    String password;
    String phoneNumber;
    boolean hideSocialContactData;
    String urlSocial1;
    String urlSocial2;
    String messenger1;
    String messenger2;
    String city;
    String cityRegion;
    String country;
    boolean datingServiceParticipation;
    Set<Accommodation> accDetails;


}
