package com.hub.accommodation.DTO;

import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.Country;
import com.hub.accommodation.domain.Picture;
import lombok.Data;

import java.util.Set;

@Data
public class AccommodationRsDto extends BaseEntity {

    String name;
    String lastName;
    String email;
    String phoneNumber;
    String urlSocial1;
    String urlSocial2;
    String messenger1;
    String messenger2;
    String city;
    String cityRegion;
    String countryRegion;
    Country country;
    String street;
    String accommodationType;
    int numberOrRooms;
    int numberOfBeds;
    int priceTotal;
    int pricePerRoom;
    int pricePerPerson;
    Set<Picture> pictures;
    String accommodationStatus;

}
