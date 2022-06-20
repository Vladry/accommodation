package com.hub.accommodation.facade;

import com.hub.accommodation.DTO.request.DatingUserProfileRqDto;
import com.hub.accommodation.DTO.response.DatingUserProfileRsDto;
import com.hub.accommodation.domain.accommodation.Picture;
import com.hub.accommodation.domain.user.DatingUserProfile;
import org.modelmapper.Converter;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class DatingUserProfileFacade extends
        GeneralFacade<DatingUserProfile, DatingUserProfileRqDto, DatingUserProfileRsDto> {

    public DatingUserProfileFacade() {
        super(DatingUserProfile.class, DatingUserProfileRsDto.class);
    }

    @PostConstruct
    public void init(){

        super.getMm().getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT);

        Converter<List<Picture>, List<String> > picturesToUrls =
                mappingContext-> mappingContext.getSource().stream().map(Picture::getPicture).collect(Collectors.toList());

        super.getMm().typeMap(DatingUserProfile.class, DatingUserProfileRsDto.class)
                .addMappings(mappings -> mappings.using(picturesToUrls).map(DatingUserProfile::getPictures, DatingUserProfileRsDto::setPictures));


    }

}
