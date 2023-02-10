package com.hub.accommodation.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.NotBlank;
import java.util.Set;

@Accessors(chain=true)
@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserDatingProfileRqDto {

    @NotBlank
    private String userId;
    @NotBlank
    private String mySex;

    @NotBlank
    private String birthday;
    private String lastVisitDate;

    @NotBlank
    private String seekAPersonOfSex;

    @NotBlank
    private Integer myHeight;
    private Integer minHeightIWant;
    private Integer maxHeightIWant;

    private Integer minPreferredAge;
    private Integer maxPreferredAge;

    @NotBlank
    private String countryINowLiveIn;
    @NotBlank
    private String myCitizenship;
    private String wantFromCountry;

    @NotBlank
    private Integer numberOfMyChildren;
    private Integer maxNumberOfChildrenAllowed;

    private String selfDescription;
    private String traitsIWouldLoveInYou;
    private String traitsIWouldHateInYou;

    private Set<String> myInterests;
    private Set<String> desiredWithInterests;
    @NotBlank
    private Set<String> myGoals;

}
