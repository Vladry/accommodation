package com.hub.accommodation.domain.user;

import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.accommodation.enums.Country;
import com.hub.accommodation.domain.user.enums.Sex;
import lombok.*;
import lombok.experimental.Accessors;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.Period;
import java.util.Collection;
import java.util.List;

@Entity
@DynamicUpdate
@Accessors(chain=true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = {"userId"}, callSuper=false)
@Table(name = "dating_search_criteria_profiles")
public class DatingSearchCriteriaProfile extends BaseEntity {


    @Column(name="deleted")
    Boolean deleted=false;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "seek_a_person_of_sex")
    @Enumerated(EnumType.STRING)
    private Sex seekAPersonOfSex; //ok

    @Column(name = "min_height_wanted")
    private Integer minHeightIWant = 0; //ok
    @Column(name = "max_height_wanted")
    private Integer maxHeightIWant = 0; //ok

    @Column(name = "min_pref_age")
    private Integer minPreferredAge = 0; //rq Integer
    @Column(name = "max_pref_age")
    private Integer maxPreferredAge = 0; //rq Integer

    @Enumerated(EnumType.STRING)
    @Column(name = "from_country_wanted")
    private Country wantFromCountry = Country.UKRAINE; //rq String

    @Column(name = "their_children_allowed")
    private Integer maxNumberOfChildrenAllowed = 100;


//    @ElementCollection(fetch = FetchType.LAZY, targetClass = Interests.class)
//    @Enumerated(EnumType.STRING)
//    @CollectionTable(name = "their_Integererests_list")
//    @Column(name = "their_Integererests_wanted")
//    private Collection<Interests> desiredWithInterests;


    @Override
    public String toString() {
        return "searchCriteriaProfile{" +
                "id=" + id +
                "userId=" + userId +
                ", seekAPersonOfSex=" + seekAPersonOfSex +
                ", minHeightIWant=" + minHeightIWant +
                ", maxHeightIWant=" + maxHeightIWant +
                ", minPreferredAge=" + minPreferredAge +
                ", maxPreferredAge=" + maxPreferredAge +
                ", wantFromCountry=" + wantFromCountry +
                ", maxNumberOfChildrenAllowed=" + maxNumberOfChildrenAllowed +
//                ", desiredWithInterests=" + desiredWithInterests +
                '}';
    }
}



