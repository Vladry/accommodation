package com.hub.accommodation.DTO.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.user.Goals;
import com.hub.accommodation.domain.user.User;
import com.hub.accommodation.domain.user.enums.Interests;
import com.hub.accommodation.domain.user.enums.Sex;
import lombok.*;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;
import java.util.Set;

import static javax.persistence.TemporalType.TIMESTAMP;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@ToString
public class DatingUserProfileRsDto extends BaseEntity {

    private User user;

    private String sex;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.YYYY")
    private Date dBirth;

    private String iWantA;

    private Integer myHeight;
    private Integer minHeightIWant;
    private Integer maxHeightIWant;

    private Integer minPreferedAge;
    private Integer maxPreferedAge;

    private String myCountry;
    private String wantFromCountry;

    private Integer numberOfMyChildren;
    private Integer maxNumberOfChildrenAllowed;

    private String selfDescription;
    private String descriptionWhoIWant;
    private String traitsIWouldLoveInYou;
    private String traitsIWouldHaveInYou;


    Set<String> myInterests;
    Set<String> desiredWithInterests;

    Set<String> myGoals;



    private String mySpecialGoals;


}
