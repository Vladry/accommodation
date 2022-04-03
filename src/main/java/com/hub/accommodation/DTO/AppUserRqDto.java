package com.hub.accommodation.DTO;

import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.Country;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

@Data
public class AppUserRqDto extends BaseEntity {

    @Size(min = 3, message = "")
    @Size(max = 25, message = "")
    String name;
    @Size(min = 3, message = "")
    @Size(max = 25, message = "")
    String lastName;
    @Email
    String email;
    String phoneNumber;
    boolean hideSocialContactData;
    String urlSocial1;
    String urlSocial2;
    String messenger1;
    String messenger2;
    @Size(min = 3, message = "")
    @Size(max = 25, message = "")
    String city;
    String cityRegion;
    @Size(min = 3, message = "")
    @Size(max = 25, message = "")
    int country;
    boolean datingServiceParticipation;

    public Country getCountryFromOrdinal(){
        return Country.values()[country];
    }
}
