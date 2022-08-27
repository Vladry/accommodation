package com.hub.accommodation.domain.user;

import com.hub.accommodation.domain.accommodation.Accommodation;
import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.user.enums.Role;
import lombok.*;

import javax.persistence.*;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
//@RequiredArgsConstructor
@NoArgsConstructor // TODO убрал, но надо вернуть, убрав ошибку
//@AllArgsConstructor  -так, как Ломбок не генерирует поля от BaseEntity, то этот конструктор я создаю везде самостоятельно
@Table(name = "users")
public class User extends BaseEntity {

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @PrimaryKeyJoinColumn
    UserDatingProfile userDatingProfile;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Accommodation> accommodation = new HashSet<>();


    @Column(name = "name", length = 20)
    private String name = "";
    @Column(name = "last_name", length = 25, nullable = true)
    private String lastName = "";
    @Column(name = "email", length = 40)
    private String email = "";
    @Column(name = "password", length = 120)
    private String password = "";
    @Column(name = "phone", length = 19, nullable = true)
    private String phoneNumber = "";

    @Column(name = "social_1")
    private String urlSocial1 = "";  //укажите URL ссылку на Ваш профайл в социальной сети (Facebook, Instagram, другое)
    @Column(name = "social_2")
    private String urlSocial2 = "";  //укажите URL ссылку на Ваш профайл в другой социальной сети (Facebook, Instagram, другое)
    @Column(name = "messenger_1", length = 30)
    private String messenger1 = "";  //Один из Ваших мессенджеров должен быть указан для возможности быстрой связи с Вами нашей системой. Укажите адрес в мессенджере и, через побел - какой это мессенджер (вайбер, телеграм, прочее)
    @Column(name = "messenger_2", length = 30)
    private String messenger2 = "";  //если желаете, укажите второй мессенджера и, через побел - какой это мессенджер (вайбер, телеграм, прочее)

    @Column(name = "avatar")
    private String avatar = "";

    @Column(name = "hide_social_data", nullable = false)
    private boolean hideSocialContactData = false; //снимите галочку, если хотите, чтобы Ваши социальные сети и мессенджеры были доступны соискателям. Иначе, они будут доступны только нашему сервису для взаимодействия с Вами, но скрыты от других пользователей.
    @Column(name = "dating_participation", nullable = false)
    private boolean datingServiceParticipation = false;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;


    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // из-за конфликта Ломбоковской генерации с суперклассом BaseEntity, всегда прописываем AllArgsConstructor руками
    public User(Long id, Instant lastModifiedDate, ZonedDateTime createdDate, UserDatingProfile userDatingProfile, Set<Accommodation> accommodation, String name, String lastName, String email, String password, String phoneNumber, String urlSocial1, String urlSocial2, String messenger1, String messenger2, String avatar, boolean hideSocialContactData, boolean datingServiceParticipation, Role role) {
        this.id = id;
        this.lastModifiedDate = lastModifiedDate;
        this.createdDate = createdDate;
        this.userDatingProfile = userDatingProfile;
        this.accommodation = accommodation;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.urlSocial1 = urlSocial1;
        this.urlSocial2 = urlSocial2;
        this.messenger1 = messenger1;
        this.messenger2 = messenger2;
        this.avatar = avatar;
        this.hideSocialContactData = hideSocialContactData;
        this.datingServiceParticipation = datingServiceParticipation;
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User user = (User) o;

        return (long) this.id == user.id;
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", role=" + role +
                ", id=" + id +
                '}';
    }
}
