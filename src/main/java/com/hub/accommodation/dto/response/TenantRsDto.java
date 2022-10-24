package com.hub.accommodation.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TenantRsDto {

    Long userId;

    String desiredCity;
    String desiredCountry;
    String additionalInfo;
//    Set<PictureRsDto> pictures;

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