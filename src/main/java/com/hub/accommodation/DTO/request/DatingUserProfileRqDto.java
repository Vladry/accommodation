package com.hub.accommodation.DTO.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.user.Goals;
import com.hub.accommodation.domain.user.User;
import com.hub.accommodation.domain.user.enums.Interests;
import com.hub.accommodation.domain.user.enums.Sex;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Set;

import static javax.persistence.TemporalType.TIMESTAMP;

@Getter
@Setter
//@RequiredArgsConstructor
//@AllArgsConstructor
@NoArgsConstructor
public class DatingUserProfileRqDto extends BaseEntity {

    private User user;

    private String mySex;

    private String birthday;
    private String lastVisitDate;

    private String seekAPersonOfSex;

    private Integer myHeight;
    private Integer minHeightIWant;
    private Integer maxHeightIWant;

    private Integer minPreferedAge;
    private Integer maxPreferedAge;

    private String countryINowLiveIn;
    private String myCitizenship;
    private String wantFromCountry;

    private Integer numberOfMyChildren;
    private Integer maxNumberOfChildrenAllowed;

    private String selfDescription;
    private String traitsIWouldLoveInYou;
    private String traitsIWouldHateInYou;

    private Set<String> myInterests;
    private Set<String> desiredWithInterests;
    private Set<String> myGoals;

    private List<String> pictures;



}
