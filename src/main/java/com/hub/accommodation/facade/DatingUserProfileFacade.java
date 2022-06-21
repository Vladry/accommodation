package com.hub.accommodation.facade;

import com.hub.accommodation.DTO.request.DatingUserProfileRqDto;
import com.hub.accommodation.DTO.response.DatingUserProfileRsDto;
import com.hub.accommodation.domain.accommodation.Picture;
import com.hub.accommodation.domain.user.DatingUserProfile;
import org.modelmapper.Converter;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.swing.text.html.Option;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class DatingUserProfileFacade extends
        GeneralFacade<DatingUserProfile, DatingUserProfileRqDto, DatingUserProfileRsDto> {

    public DatingUserProfileFacade() {
        super(DatingUserProfile.class, DatingUserProfileRsDto.class);
    }

    @PostConstruct
    public void init(){

        Converter<List<Picture>, List<String> > picturesToUrls =
                mappingContext-> mappingContext.getSource().stream()
                        .map(Picture::getPicture)
                        .flatMap(pic ->
                                {
                                    if ( pic == null || pic.isEmpty() ) return Stream.empty();
                                    else return Stream.of(pic);
                                }
                                ).
                        collect(Collectors.toList());

        super.getMm().typeMap(DatingUserProfile.class, DatingUserProfileRsDto.class)
                .addMappings(mappings -> mappings.using(picturesToUrls).map(DatingUserProfile::getPictures, DatingUserProfileRsDto::setPictures));


    }

}
