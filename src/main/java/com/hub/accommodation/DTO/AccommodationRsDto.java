package com.hub.accommodation.DTO;

import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.enums.Country;
import com.hub.accommodation.domain.Picture;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccommodationRsDto extends BaseEntity {

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
    Long userId;
    boolean disabilityOrElderlySupport;
    boolean childCareSupport;
    String petsAllowed;
}
