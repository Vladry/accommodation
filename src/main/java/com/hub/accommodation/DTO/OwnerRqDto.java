package com.hub.accommodation.DTO;

import com.hub.accommodation.domain.AbstractEntity;
import com.hub.accommodation.domain.AccommodationType;
import com.hub.accommodation.domain.Country;
import com.hub.accommodation.domain.Picture;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Data
public class OwnerRqDto extends AbstractEntity {
    private final String passwordRegexp = "^(?=.*[0_9])(?=.*[a_z])(?=.*[A_Z])(?=.*[@#$%^&_+=()])(?=\\S+$).{8,20}$";

    @NotNull
    @Size(min = 3, message = "Имя не может быть короче 3х символов!")
    @Size(max = 30, message = "Имя не должно быть более 30-ти символов!")
    String name;

    @Size(min = 3, message = "Фамилия не может быть короче 3х символов!")
    @Size(max = 60, message = "Фамилия не должна быть более 60-ти символов!")
    @NotNull
    String lastName;

    @Email
    String email;

    @Pattern(regexp = passwordRegexp)
    String password;

    @NotNull
    @Pattern(regexp = "(\\+38|0)[0_9]{9}]")
    String phoneNumber;
    String urlSocial;
    String messenger;
    String city;
    String cityRegion;
    String countryRegion;
    Country country;
    String street;
    AccommodationType accomodationType;
    int numberOrRooms;
    int totalNumberOfBeds;
//    int price;
//    Set<Picture> pictures = new HashSet<>();

}
