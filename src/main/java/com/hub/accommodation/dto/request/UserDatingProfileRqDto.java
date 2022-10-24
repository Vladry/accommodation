package com.hub.accommodation.dto.request;

import lombok.*;
import lombok.experimental.Accessors;

import java.util.List;
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

//    private String myInterests;
    private Set<String> myInterests;
    private Set<String> desiredWithInterests;
//    private String myGoals;
    private Set<String> myGoals;

    private List<String> pictures;

//    public UserDatingProfileRqDto(
//            String userId, String mySex, String birthday, String lastVisitDate, String seekAPersonOfSex, Integer myHeight, Integer minHeightIWant, Integer maxHeightIWant, Integer minPreferredAge, Integer maxPreferredAge, String countryINowLiveIn, String myCitizenship, String wantFromCountry, Integer numberOfMyChildren, Integer maxNumberOfChildrenAllowed, String selfDescription, String traitsIWouldLoveInYou, String traitsIWouldHateInYou, /*Set<String> myInterests,*/ String myInterests, Set<String> desiredWithInterests, /*Set<String> myGoals,*/ String myGoals, List<String> pictures) {
//        this.userId = userId;
//        this.mySex = mySex;
//        this.birthday = birthday;
//        this.lastVisitDate = lastVisitDate;
//        this.seekAPersonOfSex = seekAPersonOfSex;
//        this.myHeight = myHeight;
//        this.minHeightIWant = minHeightIWant;
//        this.maxHeightIWant = maxHeightIWant;
//        this.minPreferredAge = minPreferredAge;
//        this.maxPreferredAge = maxPreferredAge;
//        this.countryINowLiveIn = countryINowLiveIn;
//        this.myCitizenship = myCitizenship;
//        this.wantFromCountry = wantFromCountry;
//        this.numberOfMyChildren = numberOfMyChildren;
//        this.maxNumberOfChildrenAllowed = maxNumberOfChildrenAllowed;
//        this.selfDescription = selfDescription;
//        this.traitsIWouldLoveInYou = traitsIWouldLoveInYou;
//        this.traitsIWouldHateInYou = traitsIWouldHateInYou;
//        this.myInterests = myInterests;
//        this.desiredWithInterests = desiredWithInterests;
//        this.myGoals = myGoals;
//        this.pictures = pictures;
//    }
//
}
