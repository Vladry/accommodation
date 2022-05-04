package com.hub.accommodation.DTO.request;

import com.hub.accommodation.domain.*;
import com.hub.accommodation.domain.accommodation.enums.AccommodationStatus;
import com.hub.accommodation.domain.accommodation.enums.AccommodationType;
import com.hub.accommodation.domain.accommodation.enums.Pets;
import com.hub.accommodation.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccommodationRqDto extends BaseEntity {

    private UserService service;

    public AccommodationRqDto(UserService service) {
        this.service = service;
    }

    String location;
    int accommodationType;
    int numberOfRooms;
    int numberOfBeds;
    int priceTotal;
    int pricePerRoom;
    int pricePerPerson;
    boolean helpWithWork;
    boolean helpWithFood;
    int status;
    boolean datingServiceParticipation;
    Long userId;
    boolean disabilityOrElderlySupport;
    boolean childCareSupport;
    int petsAllowed;
    int liked; // TODO ? проверить типа поля!!

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