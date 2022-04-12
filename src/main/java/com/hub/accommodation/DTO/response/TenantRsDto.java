package com.hub.accommodation.DTO.response;

import com.hub.accommodation.domain.accommodation.Picture;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
public class TenantRsDto {

    String desiredCity;
    String desiredCountry;
    Set<Picture> pictures;

    int numberOfOlderChildren;
    int numberOfYoungerChildren;
    int adultsYounger60;
    int adultsOver60;
    int numberOfDogs;
    int numberOfCats;
    int numberOfOtherPets;
    String desiredLengthOfStay;
    String additionalInfo;
    int familyMembersRequiringSpecialCare;
}