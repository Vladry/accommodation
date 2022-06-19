package com.hub.accommodation.DTO.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import com.hub.accommodation.Views;
import com.hub.accommodation.domain.accommodation.Accommodation;
import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.user.DatingUserProfile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Temporal;
import java.util.Date;
import java.util.Set;

import static javax.persistence.TemporalType.TIMESTAMP;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRsDto extends BaseEntity {

    String name = "";
    @JsonView(Views.Public.class)
    String lastName = "";
    String email = "";
    @JsonView(Views.Internal.class)
    String phoneNumber = "";
    String urlSocial1 = "";
    @JsonView(Views.Internal.class)
    String urlSocial2 = "";
    String messenger1 = "";
    @JsonView(Views.Internal.class)
    String messenger2 = "";
    String avatar = "";
    boolean hideSocialContactData = false;
    boolean datingServiceParticipation = false;
    Set<AccommodationRsDto> accommodation;
    String sex;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.YYYY")
    @Temporal(TIMESTAMP)
    Date dBirth;
    String datingUserProfile;


}
