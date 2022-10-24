package com.hub.accommodation.dto.response;

import com.hub.accommodation.domain.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccommodationRsDto extends BaseEntity {

    String userId;
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
