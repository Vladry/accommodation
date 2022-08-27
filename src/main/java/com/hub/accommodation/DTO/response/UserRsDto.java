package com.hub.accommodation.DTO.response;

import com.fasterxml.jackson.annotation.JsonView;
import com.hub.accommodation.Views;
import com.hub.accommodation.domain.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRsDto extends BaseEntity {

    @JsonView(Views.Public.class)
    String name = "";
    @JsonView(Views.Public.class)
    String lastName = "";
    @JsonView(Views.Internal.class)
    String email = "";
    @JsonView(Views.Internal.class)
    String phoneNumber = "";
    @JsonView(Views.Public.class)
    String urlSocial1 = "";
    @JsonView(Views.Internal.class)
    String urlSocial2 = "";
    @JsonView(Views.Public.class)
    String messenger1 = "";
    @JsonView(Views.Internal.class)
    String messenger2 = "";
    @JsonView(Views.Public.class)
    String avatar = "";
    boolean hideSocialContactData = false;
    boolean datingServiceParticipation = false;
//    Set<AccommodationRsDto> accommodation;
    private String role;
//    private String lastModifiedDate;
//    private String createdDate;


}
