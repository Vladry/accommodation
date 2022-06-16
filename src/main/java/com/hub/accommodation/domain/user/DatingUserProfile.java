package com.hub.accommodation.domain.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.user.enums.Interests;
import com.hub.accommodation.domain.user.enums.Sex;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

import static javax.persistence.TemporalType.TIMESTAMP;

@Entity
@Getter
@Setter
//@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper=true)
@ToString
@Table(name = "dating_user_profile")
public class DatingUserProfile extends BaseEntity {

    @Column(name = "sex", length = 2)
    @Enumerated(EnumType.STRING)
    Sex sex;
    @Column(name = "db")
    @Temporal(TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.YYYY")
    Date dBirth;

    @Column(name = "i_want_a")
    @Enumerated(EnumType.STRING)
    Sex iWantA;

    @Column(name = "my_height")
    Integer myHeight;
    @Column(name = "min_height_wanted")
    Integer minHeightIWant;
    @Column(name = "max_height_wanted")
    Integer maxHeightIWant;

    @Column(name = "min_pref_age")
    Integer minPreferedAge;
    @Column(name = "max_pref_age")
    Integer maxPreferedAge;

    @Column(name = "my_country")
    String myCountry;
    @Column(name = "from_country_wanted")
    String wantFromCountry;

    @Column(name = "my_children")
    Integer numberOfMyChildren;
    @Column(name = "their_children_allowed")
    Integer maxNumberOfChildrenAllowed;

    @Column(name = "my_interests")
    Interests myInterests;
    @Column(name = "their_interests_wanted")
    Interests desiredWithInterests;

    @Column(name = "self_description")
    String selfDescription;
    @Column(name = "describe_who_i_want")
    String descriptionWhoIWant;
    @Column(name = "traits_i_like")
    String traitsIWouldLoveInYou;
    @Column(name = "traits_i_hate")
    String traitsIWouldHaveInYou;
    @Column(name = "my_goal")
    String mySpecialGoals;


}
