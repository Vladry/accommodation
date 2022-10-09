package com.hub.accommodation.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.hub.accommodation.DTO.request.UserDatingProfileRqDto;
import com.hub.accommodation.DTO.response.UserDatingProfileRsDto;
import com.hub.accommodation.Views;
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
//            @RequestBody UserDatingProfileRqDto udpRqDto,
            @RequestHeader("datingServiceParticipation") Boolean datingServiceParticipation) {
//        System.out.println("in controller.saveByUserId-> RequestBody: "+udpRqDto);
        System.out.println("in controller.saveByUserId-> RequestBody: "+jsonString);
        JsonToDtoConverter<UserDatingProfileRqDto> converter = new JsonToDtoConverter<>(UserDatingProfileRqDto.class);
        UserDatingProfileRqDto udpRqDto = converter.doConvert(jsonString);

        UserDatingProfile udp = userDatingProfileFacade.convertToEntity(udpRqDto);
        System.out.println("UserDatingProfile udp = userDatingProfileFacade.convertToEntity(udpRqDto)");
        System.out.println("udp: "+udp);
        if (!datingServiceParticipation) {
            userService.setDatingParticipationFlag(udp.getUserId(), true);
        }
        return userDatingProfileService.saveOrUpdate(udp); //        return userDatingProfileService.saveByUserId(udpRqDto);
    }


    //  http://localhost:8000/api/v1/datingProfile/visits/19
    @GetMapping("/datingProfile/visits/{id}")
    public void registerVisitToDating(@PathVariable("id") Long id) {
        userDatingProfileService.registerVisitToDating(id);
    }

    //    @PreAuthorize("hasAuthority('read')")
    @JsonView(Views.Public.class)
    @GetMapping("/datingProfile/{id}")
    public UserDatingProfileRsDto findUserDatingProfileById(@PathVariable("id") Long id) {
        if (id == null) {
            return null;
        }
        Optional<UserDatingProfile> udpOpt = userDatingProfileService.findUserDatingProfileByUserId(id);
        return udpOpt.map(userDatingProfileFacade::convertToDto).orElse(null);
    }

    //TODO этот метод -аналог метода ниже, но для случая, когда не получаем его из БД, а передаем udp с фронта, чтобы уменьшить кол-во запросов
/* // запускать на:  http://localhost:8000/api/v1/users/1/candidatesIds
 @CrossOrigin(origins = "*")
    @GetMapping("/candidatesIds/{currentUserId}")
    public List<Long> getMatchingDatingCandidatesIds(@PathVariable("currentUserId") Long currentUserId) {
        if (currentUserId == null) {
            System.out.println("getCandidatesIds argument currentUserId is null: returning null");
            return null;
        }
        Optional<UserDatingProfile> currUdpOpt = userDatingProfileService.findUserDatingProfileByUserId(currentUserId);

        if (currUdpOpt.isPresent()) {
            List<UserDatingProfile> candidatesMatchingCriteria = userDatingProfileService.findAllMatchingTheCriteria(currUdpOpt.get());
            List<Long> IDsOfSelectedCandidates = candidatesMatchingCriteria.stream().map(UserDatingProfile::getId).collect(Collectors.toList());
               return IDsOfSelectedCandidates;
        } else {
            throw new NoDataFoundException(String.format("NoDataFoundException: userDatingProfile for user %d does not exist", currentUserId));
        }

    }*/
    //TODO этот метод -аналог метода выше(закомментирован), но для случая, когда не передаем udp с фронта, а получаем его из БД
    @CrossOrigin(origins = "*")
    @PostMapping("/candidatesIds")
    public List<Long> getMatchingDatingCandidatesIds(
            @RequestParam("currentUserId") String currentUserId, @RequestBody UserDatingProfileRqDto udpRqDto) {
        System.out.println("getCandidatesIds, param userId: " + currentUserId);
        System.out.println("running: UserDatingProfile udp = userDatingProfileFacade.convertToEntity(udpRqDto);");
        UserDatingProfile udp = userDatingProfileFacade.convertToEntity(udpRqDto);
        System.out.println("udp: "+ udp);
        if (udp.getMySex() != null) {
            List<UserDatingProfile> candidatesMatchingCriteria = userDatingProfileService.findAllMatchingTheCriteria(udp);
            List<Long> IDsOfSelectedCandidates = candidatesMatchingCriteria.stream().map(UserDatingProfile::getId).collect(Collectors.toList());
            System.out.println("IDsOfSelectedCandidates: "+ IDsOfSelectedCandidates);
            return IDsOfSelectedCandidates;
        } else {
            throw new NoDataFoundException(String.format("NoDataFoundException: userDatingProfile for user %s does not exist", currentUserId));
        }

    }

}
