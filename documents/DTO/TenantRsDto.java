package com.hub.accommodation.DTO;

import com.hub.accommodation.domain.AbstractEntity;
import com.hub.accommodation.domain.Country;
import com.hub.accommodation.domain.Picture;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Data
public class TenantRsDto extends AbstractEntity {
    private final String passwordRegexp = "^(?=.*[0_9])(?=.*[a_z])(?=.*[A_Z])(?=.*[@#$%^&_+=()])(?=\\S+$).{8,20}$";

    String name;
    String lastName;
    String email;
    String phoneNumber;
    String urlSocial;
    String messenger;
    String desiredCity;
    String desiredCountry;
    int totalNumberOfFamilyMembers;
    Set<Picture> pictures;
    int numberOfChildren;
    int numberOfSmallChildren;
    int numberOfTeenGirls;
    int numberOfTeenBoys;
    int parents;
    int grandParents;
    int desiredLengthOfStayInMonths;
    String willYouNeedFreeFoodInFirstMonth;
    int amountOfFamilyMembersReadyToWork;
    int amountOfFamilyMembersWithLimitedAbilities;
}