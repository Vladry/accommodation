package com.hub.accommodation.domain.user;

import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.accommodation.Picture;
import com.hub.accommodation.domain.accommodation.enums.Country;
import com.hub.accommodation.domain.user.enums.Sex;
import lombok.*;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.time.*;
import java.util.*;

@Entity
@Accessors(chain=true)
@Getter
@Setter
@NoArgsConstructor
// @AllArgsConstructor  // при генерации в Lombok-е  @AllArgsConstructor  не будет выполнена инициализация и не вставятся в этот конструктор аргументы полей суперкласса.
@EqualsAndHashCode(of = {"userId"}, callSuper=false)
//Устанавливая callSuper в true, вы можете включить методы equals и hashCode суперкласса в сгенерированные методы.    https://urvanov.ru/2015/09/18/lombok-equalsandhashcode-%D0%BE%D0%B1%D0%BB%D0%B5%D0%B3%D1%87%D0%B0%D0%B5%D0%BC-%D1%81%D1%80%D0%B0%D0%B2%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BE%D0%B2/
@Table(name = "dating_user_profiles")
public class UserDatingProfile extends BaseEntity {

//     аннотация @MapsId назначит имя этой колонки как:  user_id -по полям "user" и "id"

    @Column(name="deleted")
    Boolean deleted=false; //правильное удаление сущностей из БД - это пометка поля сущности deleted=true; и вычитка всех, у кого поле deleted=false;

    @Column(name = "user_id")
    private Long userId; //rq String  null

    public void setUserIdFromString(String userIdStr){
        userId = Long.parseLong(userIdStr);
    }
//
//    @OneToOne(fetch = FetchType.LAZY)
//    @MapsId                             // https://sysout.ru/otnoshenie-onetoone-v-hibernate/
//    @JoinColumn(name = "user_id")
//    private User user;

    @Column(name = "my_sex")
    @Enumerated(EnumType.STRING)
    private Sex mySex; //ok

    @Column(name = "birthday")
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy") //-не работает эта конверсия!
    private LocalDate birthday; //rq String

//    @Column(name = "last_visit_date")
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.YYYY hh.mm.ss")
//    private ZonedDateTime lastVisitDate; //rq String


    @Column(name = "seek_a_person_of_sex")
    @Enumerated(EnumType.STRING)
    private Sex seekAPersonOfSex; //ok

    @Column(name = "my_height")
    private Integer myHeight = 0; //ok
    @Column(name = "min_height_wanted")
    private Integer minHeightIWant = 0; //ok
    @Column(name = "max_height_wanted")
    private Integer maxHeightIWant = 0; //ok

    @Column(name = "min_pref_age")
    private Integer minPreferredAge = 0; //rq Integer
    @Column(name = "max_pref_age")
    private Integer maxPreferredAge = 0; //rq Integer

    @Enumerated(EnumType.STRING)
    @Column(name = "country_i_now_live_in")
    private Country countryINowLiveIn = Country.UKRAINE; //rq String

    @Enumerated(EnumType.STRING)
    @Column(name = "my_citizenship")
    private Country myCitizenship = Country.UKRAINE; //rq String

    @Enumerated(EnumType.STRING)
    @Column(name = "from_country_wanted")
    private Country wantFromCountry = Country.UKRAINE; //rq String


    @Column(name = "my_children")
    private Integer numberOfMyChildren = 0; //ok
    @Column(name = "their_children_allowed")
    private Integer maxNumberOfChildrenAllowed = 100; //ok


    @Column(name = "self_description")
    private String selfDescription; //ok
    @Column(name = "traits_i_like")
    private String traitsIWouldLoveInYou;
    @Column(name = "traits_i_hate")
    private String traitsIWouldHateInYou;


    @ElementCollection(fetch = FetchType.LAZY, targetClass = Interests.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "dating_interests")
//    @CollectionTable(name = "user_dating_interests", joinColumns = {@JoinColumn(name = "USER_DATING_PROFILE_ID")})
    @Column(name = "interests") //именует колонку доп.таблицы интересов. Но не текущее поле в текущей таблице (((
    private Collection<Interests> myInterests;

    @ElementCollection(fetch = FetchType.LAZY, targetClass = Goals.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "dating_goals")
    @Column(name = "goals")
    private Collection<Goals> myGoals;

/*
    @ElementCollection(fetch = FetchType.LAZY, targetClass = Interests.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "their_Integererests_list")
    @Column(name = "their_Integererests_wanted")
    private Collection<Interests> desiredWithInterests;

*/

    private Integer age;

    private void setAge(){
        if(this.birthday==null){return;}
        LocalDate now = LocalDate.now();
        Period period = Period.between(this.birthday, now);
        this.age = period.getYears();
    }

    public UserDatingProfile(Long userId, Sex mySex, LocalDate birthday, Sex seekAPersonOfSex, Integer myHeight, Integer minHeightIWant, Integer maxHeightIWant, Integer minPreferredAge, Integer maxPreferredAge, Country countryINowLiveIn, Country myCitizenship, Country wantFromCountry, Integer numberOfMyChildren, Integer maxNumberOfChildrenAllowed, String selfDescription, String traitsIWouldLoveInYou, String traitsIWouldHateInYou, List<Interests> myInterests, List<Interests> desiredWithInterests, List<Goals> myGoals) {
        this.userId = userId;
        this.mySex = mySex;
        this.birthday = birthday;
        this.seekAPersonOfSex = seekAPersonOfSex;
        this.myHeight = myHeight;
        this.minHeightIWant = minHeightIWant;
        this.maxHeightIWant = maxHeightIWant;
        this.minPreferredAge = minPreferredAge;
        this.maxPreferredAge = maxPreferredAge;
        this.countryINowLiveIn = countryINowLiveIn;
        this.myCitizenship = myCitizenship;
        this.wantFromCountry = wantFromCountry;
        this.numberOfMyChildren = numberOfMyChildren;
        this.maxNumberOfChildrenAllowed = maxNumberOfChildrenAllowed;
        this.selfDescription = selfDescription;
        this.traitsIWouldLoveInYou = traitsIWouldLoveInYou;
        this.traitsIWouldHateInYou = traitsIWouldHateInYou;
        this.myInterests = myInterests;
        this.myGoals = myGoals;
//        this.desiredWithInterests = desiredWithInterests;
    }


    @Override
    public String toString() {
        return "UserDatingProfile{" +
                "userId=" + userId +
                ", mySex=" + mySex +
                ", birthday=" + birthday +
                ", seekAPersonOfSex=" + seekAPersonOfSex +
                ", myHeight=" + myHeight +
                ", minHeightIWant=" + minHeightIWant +
                ", maxHeightIWant=" + maxHeightIWant +
                ", minPreferredAge=" + minPreferredAge +
                ", maxPreferredAge=" + maxPreferredAge +
                ", countryINowLiveIn=" + countryINowLiveIn +
                ", myCitizenship=" + myCitizenship +
                ", wantFromCountry=" + wantFromCountry +
                ", numberOfMyChildren=" + numberOfMyChildren +
                ", maxNumberOfChildrenAllowed=" + maxNumberOfChildrenAllowed +
                ", selfDescription='" + selfDescription + '\'' +
                ", traitsIWouldLoveInYou='" + traitsIWouldLoveInYou + '\'' +
                ", traitsIWouldHateInYou='" + traitsIWouldHateInYou + '\'' +
                ", myInterests=" + myInterests +
                ", myGoals=" + myGoals +
//                ", desiredWithInterests=" + desiredWithInterests +
                '}';
    }
}



