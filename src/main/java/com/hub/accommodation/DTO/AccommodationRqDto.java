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

// TODO  написать кастомную валидацию: https://stackoverflow.com/questions/31132477/java-annotation-for-null-but-neither-empty-nor-blank
//    @Size(min = 3, message = "Имя не может быть короче 3х символов!")
//    @Size(max = 30, message = "Имя не должно быть более 30-ти символов!")
    String name;
//    @Size(min = 3, message = "Фамилия не может быть короче 3х символов!")
//    @Size(max = 60, message = "Фамилия не должна быть более 60-ти символов!")
//    @NotNull
    String lastName;
    @NotNull
    @Email
    String email;
//    @Pattern(regexp = passwordRegexp)
    String password;
//    @NotNull
//    @Pattern(regexp = "(\\+38|0)[0_9]{9}]")
    String phoneNumber;
    @URL
    String urlSocial1;
    @URL
    String urlSocial2;
    @NotNull
    @Size(min = 3, message = "минимум - 3 символа")
    @Size(max = 20, message = "не более 20ти символов")
    String messenger1;
    String messenger2;
    @NotNull
    String city;
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
    int status;
}
