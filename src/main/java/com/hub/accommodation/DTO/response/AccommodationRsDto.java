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

//    Long user;
    String location;
    String accommodationType;
    Integer numberOfRooms;
    Integer numberOfBeds;
    Integer priceTotal;
    Integer pricePerRoom;
    Integer pricePerPerson;
    boolean helpFindWork = false;
    boolean helpWithFood = false;
    //    Set<PictureRsDto> pictures;
    String accommodationStatus;
//    Integer liked;
    boolean disabilityOrElderlySupport = false;
    boolean childCareSupport = false;
    String petsAllowed;
}
