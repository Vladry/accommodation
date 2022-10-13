package com.hub.accommodation.facade;

import com.hub.accommodation.DTO.request.UserDatingProfileRqDto;
import com.hub.accommodation.DTO.response.UserDatingProfileRsDto;
import com.hub.accommodation.domain.accommodation.Picture;
import com.hub.accommodation.domain.user.Goals;
import com.hub.accommodation.domain.user.User;
import com.hub.accommodation.domain.user.UserDatingProfile;
import com.hub.accommodation.domain.user.enums.Interests;
import org.modelmapper.Converter;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class UserDatingProfileFacade extends
        GeneralFacade<UserDatingProfile, UserDatingProfileRqDto, UserDatingProfileRsDto> {

    public UserDatingProfileFacade() {
        super(UserDatingProfile.class, UserDatingProfileRsDto.class);
    }

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

        Converter<String, LocalDate> convBirthdayFromRqDto =
                mappingContext -> LocalDate.parse(mappingContext.getSource(), DateTimeFormatter.ofPattern("dd.MM.yyyy"));


        Converter<LocalDate, String> convBirthdayToRsDto =
                mappingContext -> {
                    System.out.println("convBirthdayToRsDto-> input: " + mappingContext.getSource().toString());
                    String str = mappingContext.getSource().format(DateTimeFormatter.ofPattern("dd.MM.yyyy"));
                    System.out.println("convBirthdayToRsDto-> localDateStr: " + str);
                    return str;
                };

        Converter<LocalDate, Integer> convAge = mappingContext ->
        {
            LocalDate dateNow = LocalDate.now();

            Period period = Period.between(mappingContext.getSource(), dateNow);
            return period.getYears();
        };

        super.getMm().typeMap(UserDatingProfile.class, UserDatingProfileRsDto.class)
                .addMappings(mappings -> mappings.using(convAge).map(UserDatingProfile::getBirthday, UserDatingProfileRsDto::setAge))
                .addMappings(mappings -> mappings.using(convBirthdayToRsDto).map(UserDatingProfile::getBirthday, UserDatingProfileRsDto::setBirthday))
                .addMappings(mappings -> mappings.using(picturesToUrls).map(UserDatingProfile::getPictures, UserDatingProfileRsDto::setPictures))
        ;

        super.getMm().typeMap(UserDatingProfileRqDto.class, UserDatingProfile.class)
                .addMappings(mappings -> mappings.using(convBirthdayFromRqDto).map(UserDatingProfileRqDto::getBirthday, UserDatingProfile::setBirthday))
//                .addMappings(mappings->mappings.using((idStr)->Long.parseLong((String)idStr.getSource())).map(UserDatingProfileRqDto::getUserId, UserDatingProfile::setUserId))
                .addMapping(UserDatingProfileRqDto::getUserId, UserDatingProfile::setUserIdFromString)
//  TODO              .addMapping(UserDatingProfileRqDto::getLastVisitDate, UserDatingProfile::setLastVisitDateParse)
//  TODO              .addMapping(UserDatingProfileRqDto::getBirthday, UserDatingProfile::setBirthdayParse)
        ;

    }

}
