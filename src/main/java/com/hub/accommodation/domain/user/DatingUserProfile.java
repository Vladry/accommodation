package com.hub.accommodation.domain.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.accommodation.Picture;
import com.hub.accommodation.domain.user.enums.Interests;
import com.hub.accommodation.domain.user.enums.Sex;
import lombok.*;

import javax.persistence.*;
import javax.persistence.criteria.Fetch;
import java.util.*;

import static javax.persistence.TemporalType.TIMESTAMP;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
//@NoArgsConstructor
//@AllArgsConstructor  // при генерации в Lombok-е  @AllArgsConstructor  не будет выполнена инициализация и не вставятся в этот конструктор аргументы полей суперкласса.
//@EqualsAndHashCode(of = {"id"})
@EqualsAndHashCode(callSuper = true)   //Устанавливая callSuper в true, вы можете включить методы equals и hashCode суперкласса в сгенерированные методы.    https://urvanov.ru/2015/09/18/lombok-equalsandhashcode-%D0%BE%D0%B1%D0%BB%D0%B5%D0%B3%D1%87%D0%B0%D0%B5%D0%BC-%D1%81%D1%80%D0%B0%D0%B2%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BE%D0%B2/
@ToString
@Table(name = "dating_user_profiles")
public class DatingUserProfile extends BaseEntity{

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
    private Collection<Interests> myInterests;

    @ElementCollection(fetch = FetchType.LAZY, targetClass = Interests.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "their_interests_list")
    @Column(name = "their_interests_wanted")
    private Collection<Interests> desiredWithInterests;

    @ElementCollection(fetch = FetchType.LAZY, targetClass = Goals.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "user_goals")
    @Column(name = "goals")
    private Collection<Goals> myGoals;

    @Column(name = "my_other_goal")
    private String mySpecialGoals;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "datingUserProfile")
    private List<Picture> pictures = new ArrayList<>();

}



