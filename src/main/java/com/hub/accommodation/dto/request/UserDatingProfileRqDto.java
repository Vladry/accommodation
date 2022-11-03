package com.hub.accommodation.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.util.Set;

@Accessors(chain=true)
@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserDatingProfileRqDto {

    private String userId;
    private String mySex;

    private String birthday;
    private String lastVisitDate;

    private String seekAPersonOfSex;

    private Integer myHeight;
    private Integer minHeightIWant;
    private Integer maxHeightIWant;

    private Integer minPreferredAge;
    private Integer maxPreferredAge;

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

}
