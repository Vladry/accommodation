package com.hub.accommodation.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@NoArgsConstructor
@NotEmpty
public class TenantRqDto {

    Long userId;

    String desiredCity;
    String desiredCountry;
    String additionalInfo;

    Integer elderChildren;
    Integer babies;
    Integer adults;
    Integer eldery;
    Integer numberOfDogs;
    Integer numberOfCats;
    Integer otherPets;
    String severityStatus;
    String desiredLengthOfStay;

    Integer personsRequiringCare;


}