package com.hub.accommodation.domain.user;

import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.accommodation.Picture;
import com.hub.accommodation.domain.accommodation.enums.LengthOfStay;
import com.hub.accommodation.domain.user.enums.SeverityStatus;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
//@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Table(name = "tenants")
public class Tenant extends BaseEntity {

    String desiredCity; //если не указано -подразумевается, что подходит любой город
    String desiredCountry; //если не указано- подразумевается, что подходит любая страна
    @OneToMany(mappedBy = "tenant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<Picture> pictures = new HashSet<>();

    @Column(name = "older_children")
    int numberOfOlderChildren;
    @Column(name = "younger_children")
    int numberOfYoungerChildren;
    @Column(name = "younger_adults_over")
    int adultsYounger60;
    @Column(name = "older_adults_over")
    int adultsOver60;
    @Column(name = "dogs")
    int numberOfDogs;
    @Column(name = "cats")
    int numberOfCats;
    @Column(name = "other_pets")
    int numberOfOtherPets;
    @Enumerated(EnumType.STRING)
    @Column(name = "severity")
    SeverityStatus severityStatus;
    @Enumerated(EnumType.STRING)
    @Column(name = "stay_length")
    LengthOfStay desiredLengthOfStay;  //требуемая продолжительность проживания в данном месте:  "-1" -не известно;  "0" -до месяца. "1000" - как можно дольше, либо укажите приблизительное количество месяцев (если известны планы)
    @Column(name = "require_care")
    int familyMembersRequiringSpecialCare; //если есть члены семьи с инвалидность, укажите кол-во

    public String getDesiredLengthOfStayEnum() {
        return desiredLengthOfStay.name();
    }
}