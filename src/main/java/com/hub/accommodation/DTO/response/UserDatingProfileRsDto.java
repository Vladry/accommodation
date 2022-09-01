package com.hub.accommodation.DTO.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.user.User;
import lombok.*;

import javax.annotation.PostConstruct;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class UserDatingProfileRsDto extends BaseEntity {

    private String userId;

    private String mySex;

    private String seekAPersonOfSex;

    private Integer myHeight;
    private Integer minHeightIWant;
    private Integer maxHeightIWant;

    private Integer minPreferedAge;
    private Integer maxPreferedAge;

    private String countryINowLiveIn;
    private String myCitizenship;
    private String wantFromCountry;

    private Integer numberOfMyChildren;
    private Integer maxNumberOfChildrenAllowed;

    private String selfDescription;
    private String traitsIWouldLoveInYou;
    private String traitsIWouldHateInYou;

    private Set<String> myInterests;
    private Set<String> desiredWithInterests;
    private Set<String> myGoals;
    private List<String> pictures;

@JsonIgnore
    private LocalDate birthday;
    @JsonIgnore
    private LocalDateTime lastVisitDate;
    private int age;
    private String lastVisited;


    public UserDatingProfileRsDto() {
        setAge();
        setLastVisitPeriod();
    }

    public void setBirthday(LocalDate birthday){
        this.birthday = birthday;
        setAge();
    }
    private void setAge() {
        if(this.birthday==null){return;}
        LocalDate dateNow = LocalDate.now();
        Period period = Period.between(this.birthday, dateNow);
        this.age = period.getYears();
    }

    public void setLastVisitDate(LocalDateTime lastVisitDate){
        this.lastVisitDate = lastVisitDate;
        setLastVisitPeriod();
    }
    private void setLastVisitPeriod() {
        if(this.lastVisitDate==null) {
            return;
        }
        LocalDateTime dateTimeNow = LocalDateTime.now();
        long years = Period.between(this.lastVisitDate.toLocalDate(), dateTimeNow.toLocalDate()).getYears();
        long months = Period.between(this.lastVisitDate.toLocalDate(), dateTimeNow.toLocalDate()).getMonths();
        long days = Duration.between(this.lastVisitDate, dateTimeNow).toDays();
        long hours = Duration.between(this.lastVisitDate, dateTimeNow).toHours();
        long minutes = Duration.between(this.lastVisitDate, dateTimeNow).toMinutes();

        if (years > 0) {
            this.lastVisited = "last visit: " + years + "years ago";
        } else if (months > 0) {
            this.lastVisited = "last visit: " + months + "months ago";
        } else if (days > 0) {
            this.lastVisited = "last visit: " + days + "days ago";
        } else if (hours > 0) {
            this.lastVisited = "last visit: " + hours + "hours ago";
        } else {
            this.lastVisited = "last visit: " + minutes + "minutes ago";
        }
    }

    @Override
    public String toString() {
        return "UserDatingProfileRsDto{" +
                "id='" + id + '\'' +
                "userId='" + userId + '\'' +
                "mySex='" + mySex + '\'' +
                ", seekAPersonOfSex='" + seekAPersonOfSex + '\'' +
                ", myHeight=" + myHeight +
                ", minHeightIWant=" + minHeightIWant +
                ", maxHeightIWant=" + maxHeightIWant +
                ", minPreferedAge=" + minPreferedAge +
                ", maxPreferedAge=" + maxPreferedAge +
                ", countryINowLiveIn='" + countryINowLiveIn + '\'' +
                ", myCitizenship='" + myCitizenship + '\'' +
                ", wantFromCountry='" + wantFromCountry + '\'' +
                ", numberOfMyChildren=" + numberOfMyChildren +
                ", maxNumberOfChildrenAllowed=" + maxNumberOfChildrenAllowed +
                ", selfDescription='" + selfDescription + '\'' +
                ", traitsIWouldLoveInYou='" + traitsIWouldLoveInYou + '\'' +
                ", traitsIWouldHateInYou='" + traitsIWouldHateInYou + '\'' +
                ", myInterests=" + myInterests +
                ", desiredWithInterests=" + desiredWithInterests +
                ", myGoals=" + myGoals +
                ", pictures=" + pictures +
                ", birthday=" + birthday +
                ", lastVisitDate=" + lastVisitDate +
                ", age=" + age +
                ", lastVisited='" + lastVisited + '\'' +
                ", createdDate='" + createdDate + '\'' +
                '}';
    }
}
