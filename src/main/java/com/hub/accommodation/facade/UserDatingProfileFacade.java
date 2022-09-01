package com.hub.accommodation.facade;

import com.hub.accommodation.DTO.request.UserDatingProfileRqDto;
import com.hub.accommodation.DTO.response.UserDatingProfileRsDto;
import com.hub.accommodation.domain.accommodation.Picture;
import com.hub.accommodation.domain.user.User;
import com.hub.accommodation.domain.user.UserDatingProfile;
import org.modelmapper.Converter;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class UserDatingProfileFacade extends
        GeneralFacade<UserDatingProfile, UserDatingProfileRqDto, UserDatingProfileRsDto> {

    public UserDatingProfileFacade() {
        super(UserDatingProfile.class, UserDatingProfileRsDto.class);
    }

/*    @Override
    public UserDatingProfile convertToEntity(UserDatingProfileRqDto requestDTO){
        return super.convertToEntity(requestDTO);
    }

    @Override
    public UserDatingProfileRsDto convertToDto(UserDatingProfile entity){
        return super.convertToDto(entity);
    }*/

//    @Override
//    public void decorateEntity(final UserDatingProfile entity, final UserDatingProfileRqDto dto){
//        super.decorateEntity(entity, dto);
//    }
//    @Override
//    public void decorateDto(final UserDatingProfileRsDto dto, final UserDatingProfile entity){
//        super.decorateDto(dto, entity);
//    }

    @PostConstruct
    public void init() {

        Converter<List<Picture>, List<String>> picturesToUrls =
                mappingContext -> mappingContext.getSource().stream()
                        .map(Picture::getPicture)
                        .flatMap(pic ->
                                {
                                    if (pic == null || pic.isEmpty()) return Stream.empty();
                                    else return Stream.of(pic);
                                }
                        ).collect(Collectors.toList());

        super.getMm().typeMap(UserDatingProfile.class, UserDatingProfileRsDto.class)
                .addMappings(mappings -> mappings.using(picturesToUrls).map(UserDatingProfile::getPictures, UserDatingProfileRsDto::setPictures));

        super.getMm().typeMap(UserDatingProfileRqDto.class, UserDatingProfile.class)
//                .addMappings(mappings->mappings.using((idStr)->Long.parseLong((String)idStr.getSource())).map(UserDatingProfileRqDto::getUserId, UserDatingProfile::setUserId))
                .addMapping(UserDatingProfileRqDto::getUserId, UserDatingProfile::setUserIdFromString)
                .addMapping(UserDatingProfileRqDto::getLastVisitDate, UserDatingProfile::setLastVisitDateParse)
                .addMapping(UserDatingProfileRqDto::getBirthday, UserDatingProfile::setBirthdayParse);


    }

}
