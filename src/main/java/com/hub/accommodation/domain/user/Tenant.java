package com.hub.accommodation.domain.user;

import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.accommodation.Picture;
import com.hub.accommodation.domain.accommodation.enums.LengthOfStay;
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

    int numberOfOlderChildren;
    int numberOfYoungerChildren;
    int adultsYounger60;
    int adultsOver60;
    int numberOfDogs;
    int numberOfCats;
    int numberOfOtherPets;
    LengthOfStay desiredLengthOfStay;  //требуемая продолжительность проживания в данном месте:  "-1" -не известно;  "0" -до месяца. "1000" - как можно дольше, либо укажите приблизительное количество месяцев (если известны планы)
    int familyMembersRequiringSpecialCare; //если есть члены семьи с инвалидность, укажите кол-во

    public String getDesiredLengthOfStayEnum(){
        return desiredLengthOfStay.name();
    }
}