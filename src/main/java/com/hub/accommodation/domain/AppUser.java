package com.hub.accommodation.domain;

import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@ToString(of = {"name", "lastName", "email", "phoneNumber", "city", "country"})
@Table(name = "app_users")
public class AppUser extends BaseEntity {

    @Column(name = "name", length = 20, nullable = true)
    String name;
    @Column(name = "last_name", length = 25, nullable = true)
    String lastName;
//    @Column(name = "email", length = 40, nullable = false)
    String email;
//    @Column(name = "password", length = 20, nullable = false)
    String password;
    @Column(name = "phone", length = 16, nullable = true)
    String phoneNumber;
    @Column(name = "hide_social_data", nullable = true)
    boolean hideSocialContactData; //снимите галочку, если хотите, чтобы Ваши социальные сети и мессенджеры были доступны соискателям. Иначе, они будут доступны только нашему сервису для взаимодействия с Вами, но скрыты от других пользователей.
    @Column(name = "social_1")
    String urlSocial1;  //укажите URL ссылку на Ваш профайл в социальной сети (Facebook, Instagram, другое)
    @Column(name = "social_2")
    String urlSocial2;  //укажите URL ссылку на Ваш профайл в другой социальной сети (Facebook, Instagram, другое)
//    @Column(name = "messenger_1", length = 30, nullable = false)
    String messenger1;  //Один из Ваших мессенджеров должен быть указан для возможности быстрой связи с Вами нашей системой. Укажите адрес в мессенджере и, через побел - какой это мессенджер (вайбер, телеграм, прочее)
    @Column(name = "messenger_2", length = 30)
    String messenger2;  //если желаете, укажите второй мессенджера и, через побел - какой это мессенджер (вайбер, телеграм, прочее)
    @Column(name = "city", length = 25, nullable = true)
    String city;
//    @Column(name = "city_region", length = 25, nullable = false)
    String cityRegion;
//    @Column(name = "country", length = 25, nullable = false)
    Country country;
    @Column(name = "dating", nullable = true)
    boolean datingServiceParticipation;
    @OneToMany(mappedBy = "appUser", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<AccommodationDetails> accDetails = new HashSet<>();

    public AppUser(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
