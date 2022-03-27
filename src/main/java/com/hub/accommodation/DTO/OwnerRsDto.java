package com.hub.accommodation.DTO;

import com.hub.accommodation.domain.AbstractEntity;
import com.hub.accommodation.domain.AccommodationType;
import com.hub.accommodation.domain.Country;
import com.hub.accommodation.domain.Picture;
import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Data
public class OwnerRsDto extends AbstractEntity {

    String name;
    String lastName;
    String email;
    String password;
    String phoneNumber;
    String urlSocial;
    String messenger;
    String city;
    String cityRegion;
    String countryRegion;
    Country country;
    String street;
    AccommodationType accomodationType;
    int numberOrRooms;
    int totalNumberOfBeds;
    int price;
    Set<Picture> pictures = new HashSet<>();

}
