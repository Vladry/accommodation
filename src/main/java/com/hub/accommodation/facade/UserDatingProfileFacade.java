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

        Converter<Set<String>, Collection<Goals>> goalsToEnumCol =
                mappingContext -> mappingContext.getSource().stream()
                        .map(goalStr -> {
                            System.out.println("in map(goalStr->");
                            Goals res = null;
                            for (Goals g : Goals.values()) {
                                if (g.toString().equals(goalStr)) {
                                    res = g;
                                }
                            }
                            System.out.println("returning Goals: " + res);
                            return res;
                        })
                        .collect(Collectors.toSet());


/*        Converter<String, Set<Goals>> goalsToEnumCol =
                mappingContext ->
                    Stream.of(mappingContext.getSource().split(","))
                            .flatMap(goalStr -> {
                                for (Goals g : Goals.values()) {
                                    if (g.toString().equalsIgnoreCase(goalStr.trim())) {
                                       return Stream.of(g);
                                    }
                                }
                                return Stream.empty();
                            })
                            .collect(Collectors.toSet());*/

        Converter<Set<String>, Collection<Interests>> interestsToEnumCol =
                mappingContext -> mappingContext.getSource().stream()
                        .map(interestsStr -> {
                            System.out.println("in map(interestsStr->");
                            Interests res = null;
                            for (Interests interest : Interests.values()) {
                                if (interest.toString().equals(interestsStr)) {
                                    res = interest;
                                }
                            }
                            System.out.println("returning Interests: " + res);
                            return res;
                        })
                        .collect(Collectors.toSet());


/*        Converter<String, Set<Interests>> interestsToEnumCol =
                mappingContext ->
                    Stream.of(mappingContext.getSource().split(","))
                            .flatMap(interestStr -> {
                                for (Interests interest : Interests.values()) {
                                    if (interest.toString().equalsIgnoreCase(interestStr.trim())) {
                                       return Stream.of(interest);
                                    }
                                }
                                return Stream.empty();
                            })
                            .collect(Collectors.toSet());*/


        super.getMm().typeMap(UserDatingProfile.class, UserDatingProfileRsDto.class)
                .addMappings(mappings -> mappings.using(picturesToUrls).map(UserDatingProfile::getPictures, UserDatingProfileRsDto::setPictures))

        ;

        super.getMm().typeMap(UserDatingProfileRqDto.class, UserDatingProfile.class)
//                .addMappings(mappings->mappings.using((idStr)->Long.parseLong((String)idStr.getSource())).map(UserDatingProfileRqDto::getUserId, UserDatingProfile::setUserId))
                .addMapping(UserDatingProfileRqDto::getUserId, UserDatingProfile::setUserIdFromString)
//                .addMappings(mappings -> mappings.using(goalsToEnumCol).map(UserDatingProfileRqDto::getMyGoals, UserDatingProfile::setMyGoals))
//                .addMappings(mappings -> mappings.using(interestsToEnumCol).map(UserDatingProfileRqDto::getMyInterests, UserDatingProfile::setMyInterests))
//  TODO              .addMapping(UserDatingProfileRqDto::getLastVisitDate, UserDatingProfile::setLastVisitDateParse)
//  TODO              .addMapping(UserDatingProfileRqDto::getBirthday, UserDatingProfile::setBirthdayParse)
        ;

    }

}
