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
public class TenantRqDto extends AbstractEntity {
    private final String passwordRegexp = "^(?=.*[0_9])(?=.*[a_z])(?=.*[A_Z])(?=.*[@#$%^&_+=()])(?=\\S+$).{8,20}$";

    @NotNull
    @Size(min = 3, message = "Имя не может быть короче 3х символов!")
    @Column(name = "name", length = 20, nullable = false)
    String name;
    @NotNull
    @Column(name = "last_name", length = 25, nullable = true)
    String lastName;

    @Email
    @Column(name = "email", length = 40, nullable = false)
    String email;
    @NotNull
    @Pattern(regexp = passwordRegexp)
    String password;

    @NotNull
    @Pattern(regexp = "(\\+38|0)[0_9]{9}]")
    @Column(name = "phone", length = 16)
    String phoneNumber;
    String urlSocial;
    String messenger;
    String desiredCity;
    Country desiredCountry;

    int totalNumberOfFamilyMembers;
    @OneToMany(mappedBy = "tenant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<Picture> pictures = new HashSet<>();

    int numberOfChildren;
    int numberOfSmallChildren;
    int numberOfTeenGirls;
    int numberOfTeenBoys;
    int parents;
    int grandParents;
    int desiredLengthOfStayInMonths;  //требуемая продолжительность проживания в данном месте:  "-1" -не известно;  "0" -до месяца. "1000" - как можно дольше, либо укажите приблизительное количество месяцев (если известны планы)
    boolean willYouNeedFreeFoodInFirstMonth;  //потребуется ли бесплатное питание в первый месяц?
    int amountOfFamilyMembersReadyToWork;  //сколько членов вашей семьи готовы пойти работать на любую работу, или помогать по хозяйству, если предоставится возможность.
    int amountOfFamilyMembersWithLimitedAbilities; //если есть члены семьи с инвалидность, укажите кол-во
}