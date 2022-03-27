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
@Table(name = "dating-member")
public class DatingMember extends AbstractEntity {
    private final String passwordRegexp = "^(?=.*[0_9])(?=.*[a_z])(?=.*[A_Z])(?=.*[@#$%^&_+=()])(?=\\S+$).{8,20}$";

    @Column(name = "name", length = 20, nullable = false)
    String nickOrName;
    Sex sex;
    String password;
    String urlSocial1;  //укажите ссылку на профайл в социальной сети, которой хотели бы с нами поделиться. Вы можете скрыть эти данные от других пользователей, установив галочку "скрыть от публичного  просмотра".
    String urlSocial2;
    String messenger1;  //если желаете, укажите свой адрес в мессенджере и, через побел - какой это мессенджер (вайбер, телеграм, прочее)  Вы можете скрыть эти данные от других пользователей, установив галочку "скрыть от публичного  просмотра".
    String messenger2;
    String city;  // Город основного проживания
    Country country;  // Город основного проживания
    @OneToMany(mappedBy = "bearer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<Picture<DatingMember>> pictures = new HashSet<>();

}
