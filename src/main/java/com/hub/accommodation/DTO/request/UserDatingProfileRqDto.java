package com.hub.accommodation.DTO.request;

import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.user.User;
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

    public UserDatingProfileRqDto(
            String userId, String mySex, String birthday, String lastVisitDate, String seekAPersonOfSex, Integer myHeight, Integer minHeightIWant, Integer maxHeightIWant, Integer minPreferedAge, Integer maxPreferedAge, String countryINowLiveIn, String myCitizenship, String wantFromCountry, Integer numberOfMyChildren, Integer maxNumberOfChildrenAllowed, String selfDescription, String traitsIWouldLoveInYou, String traitsIWouldHateInYou, Set<String> myInterests, Set<String> desiredWithInterests, Set<String> myGoals, List<String> pictures) {
        this.userId = userId;
        this.mySex = mySex;
        this.birthday = birthday;
        this.lastVisitDate = lastVisitDate;
        this.seekAPersonOfSex = seekAPersonOfSex;
        this.myHeight = myHeight;
        this.minHeightIWant = minHeightIWant;
        this.maxHeightIWant = maxHeightIWant;
        this.minPreferedAge = minPreferedAge;
        this.maxPreferedAge = maxPreferedAge;
        this.countryINowLiveIn = countryINowLiveIn;
        this.myCitizenship = myCitizenship;
        this.wantFromCountry = wantFromCountry;
        this.numberOfMyChildren = numberOfMyChildren;
        this.maxNumberOfChildrenAllowed = maxNumberOfChildrenAllowed;
        this.selfDescription = selfDescription;
        this.traitsIWouldLoveInYou = traitsIWouldLoveInYou;
        this.traitsIWouldHateInYou = traitsIWouldHateInYou;
        this.myInterests = myInterests;
        this.desiredWithInterests = desiredWithInterests;
        this.myGoals = myGoals;
        this.pictures = pictures;
    }
}
