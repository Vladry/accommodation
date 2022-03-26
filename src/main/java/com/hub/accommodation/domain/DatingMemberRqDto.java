package com.hub.accommodation.domain;

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
    @Size(min = 3, message = "Имя не может быть короче 3х символов!")
    @Column(name = "name", length = 20, nullable = false)
    String nickOrName;
    Sex sex;

    @NotNull
    @Pattern(regexp = passwordRegexp)
    String password;

    String urlSocial1;
    String urlSocial2;
    String messenger1;
    String messenger2;
    String city;
    Country country;
    Set<Picture> pictures = new HashSet<>();

}
