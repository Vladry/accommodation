package com.hub.accommodation.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.hub.accommodation.dto.request.UserDatingProfileRqDto;
import com.hub.accommodation.dto.response.UserDatingProfileRsDto;
import com.hub.accommodation.config.Views;
import com.hub.accommodation.domain.user.UserDatingProfile;
import com.hub.accommodation.exception.NoDataFoundException;
import com.hub.accommodation.facade.UserDatingProfileFacade;
import com.hub.accommodation.service.UserDatingProfileService;
import com.hub.accommodation.service.UserService;
import com.hub.accommodation.util.JsonToDtoConverter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Validated
@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/users")
public class UserDatingProfileController {

    private final UserDatingProfileService userDatingProfileService;
    private final UserDatingProfileFacade userDatingProfileFacade;
    private final UserService userService;

    //------------------------------------------------

    @ResponseStatus(code = HttpStatus.CREATED) // https://www.baeldung.com/spring-response-status
    @PostMapping("/datingProfile")
    public UserDatingProfileRsDto saveByUserId(
            @RequestBody String jsonString,
            @RequestHeader("datingServiceParticipation") Boolean datingServiceParticipation) {
        JsonToDtoConverter<UserDatingProfileRqDto> converter = new JsonToDtoConverter<>(UserDatingProfileRqDto.class);
        UserDatingProfileRqDto udpRqDto = converter.doConvert(jsonString);
        UserDatingProfile udp = userDatingProfileFacade.convertToEntity(udpRqDto);
        if (!datingServiceParticipation) {
            userService.setDatingParticipationFlag(udp.getUserId(), true);
        }
        return userDatingProfileService.saveOrUpdate(udp); //        return userDatingProfileService.saveByUserId(udpRqDto);
    }


    @GetMapping("/datingProfile/visits/{id}")
    public void registerVisitToDating(@PathVariable("id") Long id) {
        userDatingProfileService.registerVisitToDating(id);
    }

    //    @PreAuthorize("hasAuthority('read')")
    @JsonView(Views.SeenToAll.class)
    @GetMapping("/datingProfile/{id}")
    public UserDatingProfileRsDto findUserDatingProfileById(@PathVariable("id") Long id) {
        Optional<UserDatingProfile> udpOpt = userDatingProfileService.findUserDatingProfileByUserId(id);
        return udpOpt.map(userDatingProfileFacade::convertToDto).orElse(null);
    }


    @CrossOrigin(origins = "*")
    @PostMapping("/candidatesIds")
    public List<Long> getMatchingDatingCandidatesIds(
            @RequestParam("currentUserId") String currentUserId, @RequestBody UserDatingProfileRqDto udpRqDto) {
        UserDatingProfile udp = userDatingProfileFacade.convertToEntity(udpRqDto);
        if (udp.getMySex() != null) {
            List<UserDatingProfile> candidatesMatchingCriteria = userDatingProfileService.findAllMatchingTheCriteria(udp);
            List<Long> IDsOfSelectedCandidates = candidatesMatchingCriteria.stream().map(UserDatingProfile::getId).collect(Collectors.toList());
            return IDsOfSelectedCandidates;
        } else {
            throw new NoDataFoundException("userDatingProfile in UserDatingProfileController::getMatchingDatingCandidatesIds->  for user %s ", currentUserId);
        }

    }

}
