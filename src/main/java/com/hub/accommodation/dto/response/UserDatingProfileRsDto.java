package com.hub.accommodation.dto.response;

import com.fasterxml.jackson.annotation.JsonView;
import com.hub.accommodation.config.Views;
import com.hub.accommodation.domain.BaseEntity;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class UserDatingProfileRsDto extends BaseEntity {

    @JsonView(Views.Public.class)
    private String userId;
    @JsonView(Views.Public.class)
    private String mySex;
    @JsonView(Views.Public.class)
    private String seekAPersonOfSex;
    @JsonView(Views.Public.class)
    private Integer myHeight;
    @JsonView(Views.Public.class)
    private Integer minHeightIWant;
    @JsonView(Views.Public.class)
    private Integer maxHeightIWant;
    @JsonView(Views.Public.class)
    private Integer minPreferredAge;
    @JsonView(Views.Public.class)
    private Integer maxPreferredAge;
    @JsonView(Views.Public.class)
    private String countryINowLiveIn;
    @JsonView(Views.Public.class)
    private String myCitizenship;
    @JsonView(Views.Public.class)
    private String wantFromCountry;
    @JsonView(Views.Public.class)
    private Integer numberOfMyChildren;
    @JsonView(Views.Public.class)
    private Integer maxNumberOfChildrenAllowed;

//    @JsonView(Views.Additional.class)
//    private String selfDescription;
//    @JsonView(Views.Additional.class)
//    private String traitsIWouldLoveInYou;
//    @JsonView(Views.Additional.class)
//    private String traitsIWouldHateInYou;
//    @JsonView(Views.Additional.class)
//    private Set<String> desiredWithInterests;
    @JsonView(Views.Public.class)
    private Set<String> myInterests;
    @JsonView(Views.Public.class)
    private Set<String> myGoals;
    @JsonView(Views.Public.class)
    private String birthday;

    @JsonView(Views.Public.class)
    private Integer age;


    @Override
    public String toString() {
        return "UserDatingProfileRsDto{" +
                "id='" + id + '\'' +
                "userId='" + userId + '\'' +
                "mySex='" + mySex + '\'' +
                ", seekAPersonOfSex='" + seekAPersonOfSex + '\'' +
                ", myHeight=" + myHeight +
                ", minHeightIWant=" + minHeightIWant +
                ", maxHeightIWant=" + maxHeightIWant +
                ", minPreferredAge=" + minPreferredAge +
                ", maxPreferredAge=" + maxPreferredAge +
                ", countryINowLiveIn='" + countryINowLiveIn + '\'' +
                ", myCitizenship='" + myCitizenship + '\'' +
                ", wantFromCountry='" + wantFromCountry + '\'' +
                ", numberOfMyChildren=" + numberOfMyChildren +
                ", maxNumberOfChildrenAllowed=" + maxNumberOfChildrenAllowed +
//                ", selfDescription='" + selfDescription + '\'' +
//                ", traitsIWouldLoveInYou='" + traitsIWouldLoveInYou + '\'' +
//                ", traitsIWouldHateInYou='" + traitsIWouldHateInYou + '\'' +
                ", myInterests=" + myInterests +
//                ", desiredWithInterests=" + desiredWithInterests +
                ", myGoals=" + myGoals +
                ", birthday=" + birthday +
                ", age=" + age +
                ", createdDate='" + createdDate + '\'' +
//                ", lastVisitDate=" + lastVisitDate +
//                ", lastVisited='" + lastVisited + '\'' +
                '}';
    }
}
