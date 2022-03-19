package com.hub.accomodation.domain;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

public class DatingUser extends User{

    private String URL_datingSiteProfile;
    @Min(18)
    @Max(90)
    private int age;

}
