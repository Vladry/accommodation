package com.hub.accommodation.DTO;

import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.AccommodationType;
import com.hub.accommodation.domain.Country;
import lombok.*;
import org.hibernate.validator.constraints.URL;
import org.springframework.lang.Nullable;

import javax.validation.constraints.*;

@Data
public class AccommodationRqDto extends BaseEntity {
    private final String passwordRegexp = "^(?=.*[0_9])(?=.*[a_z])(?=.*[A_Z])(?=.*[@#$%^&_+=()])(?=\\S+$).{8,20}$";

    String cityRegion;
    String countryRegion;
    @NotNull
    Country country;
    @NotNull
    String street;
    @NotNull
    int accommodationType;
    int numberOrRooms;
    int numberOfBeds;
    int priceTotal;
    int pricePerRoom;
    int pricePerPerson;
    boolean helpWithWork;
    boolean helpWithFood;
    int status;
    String appUserName;
}
