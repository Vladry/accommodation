package com.hub.accommodation.DTO;

import com.hub.accommodation.domain.AbstractEntity;
import com.hub.accommodation.domain.Country;
import com.hub.accommodation.domain.Picture;
import com.hub.accommodation.domain.Sex;
import lombok.Data;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Data
public class DatingMemberRsDto extends AbstractEntity {

    String nickOrName;
    Sex sex;
    String password;
    String urlSocial1;
    String urlSocial2;
    String messenger1;
    String messenger2;
    String city;
    Country country;
    Set<Picture> pictures = new HashSet<>();
}
