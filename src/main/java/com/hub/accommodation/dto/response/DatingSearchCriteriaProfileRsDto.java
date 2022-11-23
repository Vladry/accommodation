package com.hub.accommodation.dto.response;

import com.fasterxml.jackson.annotation.JsonView;
import com.hub.accommodation.config.Views;
import com.hub.accommodation.domain.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class DatingSearchCriteriaProfileRsDto extends BaseEntity {

    @JsonView(Views.Public.class)
    private String userId;
    @JsonView(Views.Public.class)
    private String seekAPersonOfSex;
    @JsonView(Views.Public.class)
    private Integer minHeightIWant;
    @JsonView(Views.Public.class)
    private Integer maxHeightIWant;
    @JsonView(Views.Public.class)
    private Integer minPreferredAge;
    @JsonView(Views.Public.class)
    private Integer maxPreferredAge;
    @JsonView(Views.Public.class)
    private String wantFromCountry;
    @JsonView(Views.Public.class)
    private Integer maxNumberOfChildrenAllowed;

//    @JsonView(Views.Additional.class)
//    private Set<String> desiredWithInterests;

    @Override
    public String toString() {
        return "UserDatingProfileRsDto{" +
                "id='" + id + '\'' +
                "userId='" + userId + '\'' +
                ", seekAPersonOfSex='" + seekAPersonOfSex + '\'' +
                ", minHeightIWant=" + minHeightIWant +
                ", maxHeightIWant=" + maxHeightIWant +
                ", minPreferredAge=" + minPreferredAge +
                ", maxPreferredAge=" + maxPreferredAge +
                ", wantFromCountry='" + wantFromCountry + '\'' +
                ", maxNumberOfChildrenAllowed=" + maxNumberOfChildrenAllowed +
//                ", desiredWithInterests=" + desiredWithInterests +
                ", createdDate='" + createdDate + '\'' +
                '}';
    }
}
