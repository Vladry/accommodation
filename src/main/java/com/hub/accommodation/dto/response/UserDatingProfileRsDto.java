package com.hub.accommodation.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonView;
import com.hub.accommodation.config.Views;
import com.hub.accommodation.domain.BaseEntity;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
//@JsonView(Views.Public.class)
// @JsonInclude(JsonInclude.Include.NON_EMPTY) //-уже не нужно, т.к. это задал глобально по-умолчанию в @Configuration  objectMapper.setSerializationInclusion(JsonInclude.Include.NON_EMPTY);
public class UserDatingProfileRsDto extends BaseEntity {

    private String userId;
    private String mySex;
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
    private Set<String> myInterests;
    private Set<String> myGoals;
    private String birthday;
    private Integer age;


    @JsonView(Views.HiddenForAll.class)
    private String selfDescription;
    @JsonView(Views.HiddenForAll.class)
    private String traitsIWouldLoveInYou;
    @JsonView(Views.HiddenForAll.class)
    private String traitsIWouldHateInYou;
    @JsonView(Views.HiddenForAll.class)
    private Set<String> desiredWithInterests;

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
