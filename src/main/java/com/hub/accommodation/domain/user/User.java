package com.hub.accommodation.domain.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hub.accommodation.domain.accommodation.Accommodation;
import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.user.enums.Role;
import com.hub.accommodation.domain.user.enums.Sex;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.TemporalType.TIMESTAMP;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of={"id"})
@ToString(of = {"name", "lastName", "email", "phoneNumber", "role"})
@Table(name = "users")
public class User extends BaseEntity {

    @Column(name = "name", length = 20)
    String name = "";
    @Column(name = "last_name", length = 25, nullable = true)
    String lastName = "";
    @Column(name = "email", length = 40)
    String email = "";
    @Column(name = "password", length = 120)
    String password = "";
    @Column(name = "phone", length = 19, nullable = true)
    String phoneNumber = "";

    @Column(name = "social_1")
    String urlSocial1 = "";  //укажите URL ссылку на Ваш профайл в социальной сети (Facebook, Instagram, другое)
    @Column(name = "social_2")
    String urlSocial2 = "";  //укажите URL ссылку на Ваш профайл в другой социальной сети (Facebook, Instagram, другое)
    @Column(name = "messenger_1", length = 30)
    String messenger1 = "";  //Один из Ваших мессенджеров должен быть указан для возможности быстрой связи с Вами нашей системой. Укажите адрес в мессенджере и, через побел - какой это мессенджер (вайбер, телеграм, прочее)
    @Column(name = "messenger_2", length = 30)
    String messenger2 = "";  //если желаете, укажите второй мессенджера и, через побел - какой это мессенджер (вайбер, телеграм, прочее)
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<Accommodation> accommodation = new HashSet<>();

    @OneToOne
    DatingUserProfile datingUserProfile;

    @Column(name = "avatar")
    String avatar = "";

    @Column(name = "hide_social_data", nullable = false)
    boolean hideSocialContactData = false; //снимите галочку, если хотите, чтобы Ваши социальные сети и мессенджеры были доступны соискателям. Иначе, они будут доступны только нашему сервису для взаимодействия с Вами, но скрыты от других пользователей.
    @Column(name = "dating_participation", nullable = false)
    boolean datingServiceParticipation = false;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;


    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

}
