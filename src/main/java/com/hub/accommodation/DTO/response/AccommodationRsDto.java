package com.hub.accommodation.DTO.response;

import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.accommodation.enums.Country;
import com.hub.accommodation.domain.accommodation.Picture;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccommodationRsDto extends BaseEntity {

    @NonNull
    String location;
    String accommodationType;
    int numberOfRooms;
    int numberOfBeds;
    int priceTotal;
    int pricePerRoom;
    int pricePerPerson;
    boolean helpWithWork;
    boolean helpWithFood;
    Set<PictureRsDto> pictures;
    @NonNull
    String accommodationStatus;
    int liked;
    @NonNull
    Long userId;
    boolean disabilityOrElderlySupport;
    boolean childCareSupport;
    @NonNull
    String petsAllowed;
}
