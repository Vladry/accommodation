package com.hub.accommodation.DTO.response;

import com.hub.accommodation.domain.accommodation.Accommodation;
import com.hub.accommodation.domain.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRsDto extends BaseEntity {

    String location;
    @NonNull
    String name;
    String lastName;
    @NonNull
    String email;
    String phoneNumber;
    String urlSocial1;
    String urlSocial2;
    String messenger1;
    String messenger2;
    boolean hideSocialContactData;
    boolean datingServiceParticipation;
    Set<AccommodationRsDto> accommodation;


}
