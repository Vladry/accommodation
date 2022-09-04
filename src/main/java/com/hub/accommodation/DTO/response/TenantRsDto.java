package com.hub.accommodation.DTO.response;

import com.hub.accommodation.domain.accommodation.Picture;
import com.hub.accommodation.domain.user.enums.SeverityStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

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