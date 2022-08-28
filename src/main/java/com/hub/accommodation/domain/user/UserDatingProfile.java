package com.hub.accommodation.domain.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.accommodation.Picture;
import com.hub.accommodation.domain.accommodation.enums.Country;
import com.hub.accommodation.domain.user.enums.Interests;
import com.hub.accommodation.domain.user.enums.Sex;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Entity
@Getter
@Setter
//@RequiredArgsConstructor
@NoArgsConstructor
// @AllArgsConstructor  // при генерации в Lombok-е  @AllArgsConstructor  не будет выполнена инициализация и не вставятся в этот конструктор аргументы полей суперкласса.
@EqualsAndHashCode(callSuper = true, of={"id"})   //Устанавливая callSuper в true, вы можете включить методы equals и hashCode суперкласса в сгенерированные методы.    https://urvanov.ru/2015/09/18/lombok-equalsandhashcode-%D0%BE%D0%B1%D0%BB%D0%B5%D0%B3%D1%87%D0%B0%D0%B5%D0%BC-%D1%81%D1%80%D0%B0%D0%B2%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BE%D0%B2/
@Table(name = "dating_user_profiles")
public class UserDatingProfile extends BaseEntity{

    // аннотация @MapsId назначит имя этой колонки как:  user_id -по полям "user" и "id"
    @Id
    private Long id; //TODO - это поле уже есть в BaseEntity - разобраться!

    @OneToOne(fetch = FetchType.EAGER)
    @MapsId                             // https://sysout.ru/otnoshenie-onetoone-v-hibernate/
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
    private Integer myHeight = 0;
    @Column(name = "min_height_wanted")
    private Integer minHeightIWant = 0;
    @Column(name = "max_height_wanted")
    private Integer maxHeightIWant = 0;

    @Column(name = "min_pref_age")
    private Integer minPreferedAge = 0;
    @Column(name = "max_pref_age")
    private Integer maxPreferedAge = 0;

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
    private Integer numberOfMyChildren = 0;
    @Column(name = "their_children_allowed")
    private Integer maxNumberOfChildrenAllowed = 100;


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

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "userDatingProfile")
    private List<Picture> pictures = new ArrayList<>();


    public UserDatingProfile(Long id, User user, Sex mySex, LocalDate birthday, LocalDateTime lastVisitDate, Sex seekAPersonOfSex, Integer myHeight, Integer minHeightIWant, Integer maxHeightIWant, Integer minPreferedAge, Integer maxPreferedAge, Country countryINowLiveIn, Country myCitizenship, Country wantFromCountry, Integer numberOfMyChildren, Integer maxNumberOfChildrenAllowed, String selfDescription, String traitsIWouldLoveInYou, String traitsIWouldHateInYou, Collection<Interests> myInterests, Collection<Interests> desiredWithInterests, Collection<Goals> myGoals, List<Picture> pictures) {
        this.id = id;
        this.user = user;
        this.mySex = mySex;
        this.birthday = birthday;
        this.lastVisitDate = lastVisitDate;
        this.seekAPersonOfSex = seekAPersonOfSex;
        this.myHeight = myHeight;
        this.minHeightIWant = minHeightIWant;
        this.maxHeightIWant = maxHeightIWant;
        this.minPreferedAge = minPreferedAge;
        this.maxPreferedAge = maxPreferedAge;
        this.countryINowLiveIn = countryINowLiveIn;
        this.myCitizenship = myCitizenship;
        this.wantFromCountry = wantFromCountry;
        this.numberOfMyChildren = numberOfMyChildren;
        this.maxNumberOfChildrenAllowed = maxNumberOfChildrenAllowed;
        this.selfDescription = selfDescription;
        this.traitsIWouldLoveInYou = traitsIWouldLoveInYou;
        this.traitsIWouldHateInYou = traitsIWouldHateInYou;
        this.myInterests = myInterests;
        this.desiredWithInterests = desiredWithInterests;
        this.myGoals = myGoals;
        this.pictures = pictures;
    }

    @Override
    public String toString() {
        return "\nUserDatingProfile{" +
                "id=" + id +
                ", mySex=" + mySex +
                ", seekAPersonOfSex=" + seekAPersonOfSex +
                ", myHeight=" + myHeight +
                ", minHeightIWant=" + minHeightIWant +
                ", maxHeightIWant=" + maxHeightIWant +
                ", numberOfMyChildren=" + numberOfMyChildren +
                ", maxNumberOfChildrenAllowed=" + maxNumberOfChildrenAllowed +
                '}';
    }
}



