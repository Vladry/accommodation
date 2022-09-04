package com.hub.accommodation.domain;

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
@NoArgsConstructor
@Table(name = "tenants")
public class Tenant extends BaseEntity {

    @Column(name="user_id")
    Long userId;

    @Column(name="desired_city")
    String desiredCity; //если не указано -подразумевается, что подходит любой город
    @Column(name="desired_country")
    String desiredCountry; //если не указано- подразумевается, что подходит любая страна
    @Column(name="info")
    String additionalInfo;
    @OneToMany(mappedBy = "tenant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<Picture> pictures = new HashSet<>();
//

    @Column(name = "elder_childr")
    Integer elderChildren;
    @Column(name = "babies")
    Integer babies;

    @Column(name = "adults")
    Integer adults;
    @Column(name = "eldery")
    Integer eldery;
    @Column(name = "dogs")
    Integer numberOfDogs;
    @Column(name = "cats")
    Integer numberOfCats;
    @Column(name = "other_pets")
    Integer otherPets;
    @Column(name = "require_care")
    Integer personsRequiringCare; //если есть члены семьи с инвалидность, укажите кол-во
    @Enumerated(EnumType.STRING)
    @Column(name = "severity")
    SeverityStatus severityStatus;
    @Enumerated(EnumType.STRING)
    @Column(name = "stay_length")
    LengthOfStay desiredLengthOfStay;  //требуемая продолжительность проживания в данном месте:  "-1" -не известно;  "0" -до месяца. "1000" - как можно дольше, либо укажите приблизительное количество месяцев (если известны планы)


    public String getDesiredLengthOfStayEnum() {
        return desiredLengthOfStay.name();
    }



}