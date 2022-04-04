package com.hub.accommodation.DTO;

import com.hub.accommodation.domain.*;
import com.hub.accommodation.service.UserService;
import lombok.*;

import java.util.Optional;

@Data
public class AccommodationRqDto extends BaseEntity {
    private final String passwordRegexp = "^(?=.*[0_9])(?=.*[a_z])(?=.*[A_Z])(?=.*[@#$%^&_+=()])(?=\\S+$).{8,20}$";

    private final UserService service;

    public AccommodationRqDto(UserService service) {
        this.service = service;
    }

    Country country;
    String street;
    int accommodationType;
    int numberOrRooms;
    int numberOfBeds;
    int priceTotal;
    int pricePerRoom;
    int pricePerPerson;
    boolean helpWithWork;
    boolean helpWithFood;
    int status;
    Long userId;

    public AccommodationType getAccType() {
        return AccommodationType.values()[accommodationType];
    }

    public AccommodationStatus getAccStatus() {
        return AccommodationStatus.values()[status];
    }

    public User getUserById(){
        return service.getUserById(userId).orElse(null);
    }
}
