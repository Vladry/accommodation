package com.hub.accommodation.DTO.request;

import com.hub.accommodation.domain.*;
import com.hub.accommodation.domain.accommodation.enums.AccommodationStatus;
import com.hub.accommodation.domain.accommodation.enums.AccommodationType;
import com.hub.accommodation.domain.accommodation.enums.Pets;
import com.hub.accommodation.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)  // https://urvanov.ru/2015/09/18/lombok-equalsandhashcode-%D0%BE%D0%B1%D0%BB%D0%B5%D0%B3%D1%87%D0%B0%D0%B5%D0%BC-%D1%81%D1%80%D0%B0%D0%B2%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BE%D0%B2/
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

    public Long getTest(){return 1L;};
    public Long getMyUserId(){return this.userId;}
}