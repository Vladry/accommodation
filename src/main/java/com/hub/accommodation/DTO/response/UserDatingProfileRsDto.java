package com.hub.accommodation.DTO.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.hub.accommodation.Views;
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

    @JsonView(Views.Public.class)
    private String userId;
    @JsonView(Views.Public.class)
    private String mySex;
    @JsonView(Views.Public.class)
    private String seekAPersonOfSex;
    @JsonView(Views.Public.class)
    private Integer myHeight;
    @JsonView(Views.Public.class)
    private Integer minHeightIWant;
    @JsonView(Views.Public.class)
    private Integer maxHeightIWant;
    @JsonView(Views.Public.class)
    private Integer minPreferedAge;
    @JsonView(Views.Public.class)
    private Integer maxPreferedAge;
    @JsonView(Views.Public.class)
    private String countryINowLiveIn;
    @JsonView(Views.Public.class)
    private String myCitizenship;
    @JsonView(Views.Public.class)
    private String wantFromCountry;
    @JsonView(Views.Public.class)
    private Integer numberOfMyChildren;
    @JsonView(Views.Public.class)
    private Integer maxNumberOfChildrenAllowed;

    @JsonView(Views.Additional.class)
    private String selfDescription;
    @JsonView(Views.Additional.class)
    private String traitsIWouldLoveInYou;
    @JsonView(Views.Additional.class)
    private String traitsIWouldHateInYou;
    @JsonView(Views.Additional.class)
    private Set<String> myInterests;
    @JsonView(Views.Additional.class)
    private Set<String> desiredWithInterests;
    @JsonView(Views.Public.class)
    private Set<String> myGoals;
    @JsonView(Views.Public.class)
    private List<String> pictures;
    @JsonView(Views.Public.class)
    private LocalDate birthday;
    @JsonIgnore
    private LocalDateTime lastVisitDate;
    @JsonView(Views.Public.class)
    private Integer age;
    @JsonView(Views.Public.class)
    private String lastVisited;


    public UserDatingProfileRsDto() {
        setAge();
        setLastVisitPeriod();
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
        setAge();
    }

    private void setAge() {
        if (this.birthday == null) {
            return;
        }
        LocalDate dateNow = LocalDate.now();
        Period period = Period.between(this.birthday, dateNow);
        this.age = period.getYears();
    }

    public void setLastVisitDate(LocalDateTime lastVisitDate) {
        this.lastVisitDate = lastVisitDate;
        setLastVisitPeriod();
    }

    private void setLastVisitPeriod() {
        if (this.lastVisitDate == null) {
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
