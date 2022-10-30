package com.hub.accommodation.dto.response;

import com.fasterxml.jackson.annotation.JsonView;
import com.hub.accommodation.config.Views;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRsDto {

    private Long id;
    private Integer age;
    @JsonView(Views.Public.class)
    private String datingLastVisitDate; //rq String
    private String accommodationLastVisitDate; //rq String
    private String volunteerLastVisitDate; //rq String

    @JsonView(Views.Public.class)
    private String name = "";
    @JsonView(Views.Public.class)
    private String lastName = "";
    @JsonView(Views.Internal.class)
    private String email = "";
    @JsonView(Views.Internal.class)
    private String phoneNumber = "";
    @JsonView(Views.Public.class)
    private String urlSocial1 = "";
    @JsonView(Views.Internal.class)
    private String urlSocial2 = "";
    @JsonView(Views.Public.class)
    private String messenger1 = "";
    @JsonView(Views.Internal.class)
    private String messenger2 = "";
    @JsonView(Views.Public.class)
    private String avatar = "";
    boolean hideSocialContactData = false;
    boolean datingServiceParticipation = false;
    //    Set<AccommodationRsDto> accommodation;
    private String role;
    //    private String lastModifiedDate;
//    private String createdDate;
    @JsonView(Views.Public.class)
    private String location;

}
