package com.hub.accommodation.domain.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.user.enums.Interests;
import com.hub.accommodation.domain.user.enums.Sex;
import lombok.*;

import javax.persistence.*;
import javax.persistence.criteria.Fetch;
import java.util.Collection;
import java.util.Date;
import java.util.Set;

import static javax.persistence.TemporalType.TIMESTAMP;

@Entity
@Getter
@Setter
//@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = {"id"})
@ToString
@Table(name = "dating_user_profiles")
public class DatingUserProfile {

    // аннотация @MapsId назначит имя этой колонки как:  user_id -по полям "user" и "id"
    @Id
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "sex", length = 2)
    @Enumerated(EnumType.STRING)
    private Sex sex;
    @Column(name = "db")
    @Temporal(TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.YYYY")
    private Date dBirth;

    @Column(name = "i_want_a")
    @Enumerated(EnumType.STRING)
    private Sex iWantA;

    @Column(name = "my_height")
    private Integer myHeight;
    @Column(name = "min_height_wanted")
    private Integer minHeightIWant;
    @Column(name = "max_height_wanted")
    private Integer maxHeightIWant;

    @Column(name = "min_pref_age")
    private Integer minPreferedAge;
    @Column(name = "max_pref_age")
    private Integer maxPreferedAge;

    @Column(name = "my_country")
    private String myCountry;
    @Column(name = "from_country_wanted")
    private String wantFromCountry;

    @Column(name = "my_children")
    private Integer numberOfMyChildren;
    @Column(name = "their_children_allowed")
    private Integer maxNumberOfChildrenAllowed;


    @Column(name = "self_description")
    private String selfDescription;
    @Column(name = "describe_who_i_want")
    private String descriptionWhoIWant;
    @Column(name = "traits_i_like")
    private String traitsIWouldLoveInYou;
    @Column(name = "traits_i_hate")
    private String traitsIWouldHaveInYou;

    @ElementCollection(fetch = FetchType.LAZY, targetClass = Interests.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "my_interests_list")
    @Column(name = "my_interests")
    Collection<Interests> myInterests;

    @ElementCollection(fetch = FetchType.LAZY, targetClass = Interests.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "their_interests_list")
    @Column(name = "their_interests_wanted")
    Collection<Interests> desiredWithInterests;

    @ElementCollection(fetch = FetchType.LAZY, targetClass = Goals.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "user_goals")
    @Column(name = "goals")
    Collection<Goals> myGoals;


    @Column(name = "my_other_goal")
    private String mySpecialGoals;


}
