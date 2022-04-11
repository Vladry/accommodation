package com.hub.accommodation.DTO;

import com.hub.accommodation.domain.Picture;
import com.hub.accommodation.domain.enums.Country;
import com.hub.accommodation.domain.enums.LengthOfStay;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
public class TenantRsDto {

    String desiredCity;
    String desiredCountry;
    Set<Picture> pictures;

    int numberOfChildren;
    int numberOfSmallChildren;
    int adultsTo60;
    int adultsOver60;
    int numberOfDogs;
    int numberOfCats;
    int numberOfOtherPets;
    String desiredLengthOfStay;
    int amountOfFamilyMembersRequiringSpecialCare;
}