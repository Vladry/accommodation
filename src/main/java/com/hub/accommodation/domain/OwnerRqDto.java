package com.hub.accommodation.domain;

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
    String name;
    @NotNull
    String lastName;

    @Email
    String email;
    @NotNull
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
    int price;
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<Picture> pictures = new HashSet<>();

}
