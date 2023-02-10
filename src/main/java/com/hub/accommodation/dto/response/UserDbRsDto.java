package com.hub.accommodation.dto.response;

import com.fasterxml.jackson.annotation.JsonView;
import com.hub.accommodation.config.Views;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonView(Views.Public.class)
//@JsonInclude(JsonInclude.Include.USE_DEFAULTS)
public class UserDbRsDto {


    private Long id;
    private Integer age;
    private String datingLastVisitDate;
    private String accommodationLastVisitDate;
    private String volunteerLastVisitDate;
    private String name = "";
    private String lastName = "";
    private String role;
    private String location;
    private String avatar = "";
    boolean hideSocialContactData = false;
    boolean datingServiceParticipation = false;

    @JsonView(Views.BasicTarifUsers.class)
    private String urlSocial2 = "";
    @JsonView(Views.BasicTarifUsers.class)
    private String messenger2 = "";

    @JsonView(Views.ElevatedTarifUsers.class)
    private String email = "";
    @JsonView(Views.ElevatedTarifUsers.class)
    private String phoneNumber = "";
    @JsonView(Views.ElevatedTarifUsers.class)
    private String urlSocial1 = "";
    @JsonView(Views.ElevatedTarifUsers.class)
    private String messenger1 = "";


    //    Set<AccommodationRsDto> accommodation;
    //    private String lastModifiedDate;
//    private String createdDate;


}
