package com.hub.accommodation.DTO;

import com.hub.accommodation.domain.AbstractEntity;
import com.hub.accommodation.domain.Country;
import com.hub.accommodation.domain.Picture;
import com.hub.accommodation.domain.Sex;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Data
public class DatingMemberRqDto extends AbstractEntity {
    private final String passwordRegexp = "^(?=.*[0_9])(?=.*[a_z])(?=.*[A_Z])(?=.*[@#$%^&_+=()])(?=\\S+$).{8,20}$";

    @NotNull
    @Size(min = 3, message = "Ник не может быть короче 3х символов!")
    @Size(max = 20, message = "Ник не должен быть более 20-ти символов!")
    @Column(name = "nick", length = 20, nullable = false)
    String nickOrName;

    @NotNull
    Sex sex;

    @Pattern(regexp = passwordRegexp)
    String password;

    String urlSocial1;
    String urlSocial2;
    String messenger1;
    String messenger2;
    String city;
    Country country;
//    Set<Picture> pictures = new HashSet<>();

}
