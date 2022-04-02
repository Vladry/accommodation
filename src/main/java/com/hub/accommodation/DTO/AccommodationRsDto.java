package com.hub.accommodation.DTO;

import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.Country;
import com.hub.accommodation.domain.Picture;
import lombok.Data;

import java.util.Set;

@Data
public class AccommodationRsDto extends BaseEntity {

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
    boolean helpWithWork;
    boolean helpWithFood;
    Set<Picture> pictures;
    String accommodationStatus;
    int liked;

}
