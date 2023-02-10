package com.hub.accommodation.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotEmpty;
import java.util.Set;

@Accessors(chain=true)
@Getter
@Setter
@ToString
@NoArgsConstructor
public class DatingSearchCriteriaProfileRqDto {

    @NotEmpty
    private String userId;
    @NotEmpty
    private String id;
    private String seekAPersonOfSex;
    private Integer minHeightIWant;
    private Integer maxHeightIWant;
    private Integer minPreferredAge;
    private Integer maxPreferredAge;
    private String wantFromCountry;
    private Integer maxNumberOfChildrenAllowed;
//    private String selfDescription;
//    private String traitsIWouldLoveInYou;
//    private String traitsIWouldHateInYou;
//    private Set<String> desiredWithInterests;

}
