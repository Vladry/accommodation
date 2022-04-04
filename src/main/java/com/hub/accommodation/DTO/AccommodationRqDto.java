package com.hub.accommodation.DTO;

import com.hub.accommodation.domain.*;
import com.hub.accommodation.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class AccommodationRqDto extends BaseEntity {
    private final String passwordRegexp = "^(?=.*[0_9])(?=.*[a_z])(?=.*[A_Z])(?=.*[@#$%^&_+=()])(?=\\S+$).{8,20}$";

    private final UserService service;

    public AccommodationRqDto(UserService service) {
        this.service = service;
    }

    int country;
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

    public User getUserFromRqDto() {
        return service.getUserById(userId).orElse(null);
    }

    public User getUserFromRqDto_(){
        return  service.getUserById(1L).get();
    }



    public AccommodationType getAccType() {
        return AccommodationType.values()[accommodationType];
    }

    public AccommodationStatus getAccStatus() {
        return AccommodationStatus.values()[status];
    }

    public Country getCountryEnum(){
        return Country.values()[this.country];
    }

}