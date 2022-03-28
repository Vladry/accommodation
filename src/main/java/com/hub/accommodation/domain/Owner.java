package com.hub.accommodation.domain;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
//@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@ToString(of = {"name", "lastName", "email", "phoneNumber", "city", "country"})
@Table(name = "owners")
public class Owner extends AbstractEntity {

//    @NotNull
//    @Size(min = 3, message = "Имя не может быть короче 3х символов!")
    @Column(name = "name", length = 20, nullable = true)
    String name;
//    @NotNull
    @Column(name = "last_name", length = 25, nullable = true)
    String lastName;

//    @Email
    @Column(name = "email", length = 40, nullable = false)
    String email;
//    @NotNull
//    @Pattern(regexp = passwordRegexp)
    String password;

//    @NotNull
//    @Pattern(regexp = "(\\+38|0)[0_9]{9}]")
    @Column(name = "phone", length = 16)
    String phoneNumber;//обязательно
    String urlSocial;  //укажите ссылку на профайл в социальной сети, которой хотели бы поделиться.
    String messenger;  //если желаете, укажите свой адрес в мессенджере и, через побел - какой это мессенджер (вайбер, телеграм, прочее)
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

    public Owner(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
