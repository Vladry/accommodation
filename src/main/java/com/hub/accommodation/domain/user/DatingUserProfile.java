package com.hub.accommodation.domain.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.accommodation.Picture;
import com.hub.accommodation.domain.accommodation.enums.Country;
import com.hub.accommodation.domain.user.enums.Interests;
import com.hub.accommodation.domain.user.enums.Sex;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.persistence.criteria.Fetch;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private Long id; //TODO - это поле уже есть в BaseEntity - разобраться!

    @OneToOne(fetch = FetchType.EAGER)
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "my_sex", length = 2)
    @Enumerated(EnumType.STRING)
    private Sex mySex;

    @Column(name = "birthday")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.YYYY")
    private LocalDate birthday = LocalDate.of(1973, 5 ,13);

    @Column(name = "last_visit_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.YYYY hh.mm.ss")
    private LocalDateTime lastVisitDate = LocalDateTime.of(2022, 6 ,13, 14, 30, 33);

    @Column(name = "seek_a_person_of_sex")
    @Enumerated(EnumType.STRING)
    private Sex seekAPersonOfSex;

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

    @Enumerated(EnumType.STRING)
    @Column(name = "country_i_now_live_in")
    private Country countryINowLiveIn;

    @Enumerated(EnumType.STRING)
    @Column(name = "my_citizenship")
    private Country myCitizenship;

    @Enumerated(EnumType.STRING)
    @Column(name = "from_country_wanted")
    private Country wantFromCountry;


    @Column(name = "my_children")
    private Integer numberOfMyChildren;
    @Column(name = "their_children_allowed")
    private Integer maxNumberOfChildrenAllowed;


    @Column(name = "self_description")
    private String selfDescription;
    @Column(name = "traits_i_like")
    private String traitsIWouldLoveInYou;
    @Column(name = "traits_i_hate")
    private String traitsIWouldHateInYou;

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
    @CollectionTable(name = "user_dating_goals")
    @Column(name = "goals")
    private Collection<Goals> myGoals;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "datingUserProfile")
    private List<Picture> pictures = new ArrayList<>();

}



