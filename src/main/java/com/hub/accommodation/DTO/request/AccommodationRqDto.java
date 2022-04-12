package com.hub.accommodation.DTO.request;

import com.hub.accommodation.domain.*;
import com.hub.accommodation.domain.accommodation.enums.AccommodationStatus;
import com.hub.accommodation.domain.accommodation.enums.AccommodationType;
import com.hub.accommodation.domain.accommodation.enums.Country;
import com.hub.accommodation.domain.accommodation.enums.Pets;
import com.hub.accommodation.domain.user.User;
import com.hub.accommodation.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class AccommodationRqDto extends BaseEntity {

    private final UserService service;

    public AccommodationRqDto(UserService service) {
        this.service = service;
    }

    int accommodationType;
    int numberOfRooms;
    int numberOfBeds;
//    int priceTotal;
//    int pricePerRoom;
//    int pricePerPerson;
    boolean helpWithWork;
    boolean helpWithFood;
    int status;
    Long userId;
    boolean disabilityOrElderlySupport;
    boolean childCareSupport;
    int petsAllowed;


    public Pets getPetEnum() {
        return Pets.values()[petsAllowed];
    }

    public AccommodationType getAccType() {
        return AccommodationType.values()[accommodationType];
    }

    public AccommodationStatus getAccStatus() {
        return AccommodationStatus.values()[status];
    }

}