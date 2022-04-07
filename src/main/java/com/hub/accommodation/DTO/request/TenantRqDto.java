package com.hub.accommodation.DTO.request;

import com.hub.accommodation.domain.accommodation.enums.LengthOfStay;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TenantRqDto {

    String desiredCity;
    String desiredCountry;

    int numberOfChildren;
    int numberOfSmallChildren;
    int adultsTo60;
    int adultsOver60;
    int numberOfDogs;
    int numberOfCats;
    int numberOfOtherPets;
    int desiredLengthOfStay;
    int amountOfFamilyMembersRequiringSpecialCare;

    public LengthOfStay getLengthOfStay(){
       return LengthOfStay.values()[desiredLengthOfStay];
    }

}