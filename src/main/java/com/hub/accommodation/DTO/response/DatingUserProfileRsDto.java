package com.hub.accommodation.DTO.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.accommodation.enums.Country;
import com.hub.accommodation.domain.user.User;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@RequiredArgsConstructor
//@NoArgsConstructor
//@AllArgsConstructor
@ToString(of = {"sex", "iWantA", "myHeight", "myCountry", "numberOfMyChildren", "myInterests", "myGoals", "mySpecialGoals"})
public class DatingUserProfileRsDto extends BaseEntity {

    @JsonIgnore
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
