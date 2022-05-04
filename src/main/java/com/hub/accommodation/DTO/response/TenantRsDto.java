package com.hub.accommodation.DTO.response;

import com.hub.accommodation.domain.accommodation.Picture;
import com.hub.accommodation.domain.user.enums.SeverityStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TenantRsDto {

    String desiredCity;
    String desiredCountry;
    Set<PictureRsDto> pictures;

    int numberOfOlderChildren;
    int numberOfYoungerChildren;
    int adultsYounger60;
    int adultsOver60;
    int numberOfDogs;
    int numberOfCats;
    int numberOfOtherPets;
    String severityStatus;
    String desiredLengthOfStay;
    String additionalInfo;
    int familyMembersRequiringSpecialCare;
}