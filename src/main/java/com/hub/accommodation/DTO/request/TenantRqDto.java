package com.hub.accommodation.DTO.request;

import com.hub.accommodation.DTO.response.PictureRsDto;
import com.hub.accommodation.domain.accommodation.enums.LengthOfStay;
import com.hub.accommodation.domain.user.enums.SeverityStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
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