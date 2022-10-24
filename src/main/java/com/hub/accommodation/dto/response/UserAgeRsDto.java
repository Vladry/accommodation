package com.hub.accommodation.dto.response;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.Period;

@Setter
@Getter
@ToString
public class UserAgeRsDto {

    private Long userId;
    private LocalDate birthday;
    private Integer age;

    public UserAgeRsDto(Long userId, LocalDate birthday){
        this.userId = userId;
        this.birthday = birthday;
    }

    public void setAge(){
        LocalDate dateNow = LocalDate.now();
        Period period = Period.between(birthday, dateNow);
        this.age = period.getYears();
    }
}
