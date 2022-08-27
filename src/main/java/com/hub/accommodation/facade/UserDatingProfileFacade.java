package com.hub.accommodation.facade;

import com.hub.accommodation.DTO.request.UserDatingProfileRqDto;
import com.hub.accommodation.DTO.response.UserDatingProfileRsDto;
import com.hub.accommodation.domain.accommodation.Picture;
import com.hub.accommodation.domain.user.UserDatingProfile;
import org.modelmapper.Converter;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class UserDatingProfileFacade extends
        GeneralFacade<UserDatingProfile, UserDatingProfileRqDto, UserDatingProfileRsDto> {

    public UserDatingProfileFacade() {
        super(UserDatingProfile.class, UserDatingProfileRsDto.class);
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

        super.getMm().typeMap(UserDatingProfile.class, UserDatingProfileRsDto.class)
                .addMappings(mappings -> mappings.using(picturesToUrls).map(UserDatingProfile::getPictures, UserDatingProfileRsDto::setPictures));


    }

}
