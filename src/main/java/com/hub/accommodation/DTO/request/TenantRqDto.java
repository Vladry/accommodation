package com.hub.accommodation.DTO.request;

import com.hub.accommodation.domain.accommodation.enums.LengthOfStay;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TenantRqDto {

    String desiredCity;
    String desiredCountry;
    String additionalInfo;

    int numberOfOlderChildren;
    int numberOfYoungerChildren;
    int adultsYounger60;
    int adultsOver60;
    int numberOfDogs;
    int numberOfCats;
    int numberOfOtherPets;
    int desiredLengthOfStay;
    int familyMembersRequiringSpecialCare;

    public LengthOfStay getLengthOfStay(){
       return LengthOfStay.values()[desiredLengthOfStay];
    }

}