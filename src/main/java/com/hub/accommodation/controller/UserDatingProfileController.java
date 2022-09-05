package com.hub.accommodation.controller;

import com.hub.accommodation.DTO.request.UserDatingProfileRqDto;
import com.hub.accommodation.DTO.response.UserDatingProfileRsDto;
import com.hub.accommodation.domain.user.UserDatingProfile;
import com.hub.accommodation.exception.NoDataFoundException;
import com.hub.accommodation.facade.UserDatingProfileFacade;
import com.hub.accommodation.service.UserDatingProfileService;
import com.hub.accommodation.util.JsonToDtoConverter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    //------------------------------------------------

    @PostMapping("/datingProfile")
    public UserDatingProfileRsDto saveByUserId(@RequestBody String jsonString) {
//        System.out.println("RequestBody: "+jsonString);
        JsonToDtoConverter<UserDatingProfileRqDto> converter = new JsonToDtoConverter<>(UserDatingProfileRqDto.class);
        UserDatingProfileRqDto udpRqDto = converter.doConvert(jsonString);
        return userDatingProfileService.saveByUserId(udpRqDto);

    }




    //    @PreAuthorize("hasAuthority('read')")
    @GetMapping("/datingProfile/{id}")
    public UserDatingProfileRsDto findUserDatingProfileById(
            @PathVariable("id") Long id
    ) {
        if (id == null) {
            return null;
        }
        UserDatingProfile userDatingProfile = null;
        if (userDatingProfileService.findUserDatingProfileByUserId(id).isPresent()) {
            userDatingProfile = userDatingProfileService.findUserDatingProfileByUserId(id).get();
//            System.out.println("найден userDatingProfile: "+ userDatingProfile);
            UserDatingProfileRsDto userDatingProfileRsDto = userDatingProfileFacade.convertToDto(userDatingProfile);
//            System.out.println("userDatingProfileRsDto: "+ userDatingProfileRsDto);
            return userDatingProfileRsDto;
        } else {
            return null;
        }

    }


    // запускать на:  http://localhost:8000/api/v1/users/1/candidatesIds
    @CrossOrigin(origins = "*")
    @GetMapping("/candidatesIds/{currentUserId}")
    public List<Long> getMatchingDatingCandidatesIds(@PathVariable("currentUserId") Long currentUserId) {
        if (currentUserId == null) {
            System.out.println("getCandidatesIds argument currentUserId is null: returning null");
            return null;
        }
        Optional<UserDatingProfile> currentUserDatingProfileOpt = userDatingProfileService.findUserDatingProfileByUserId(currentUserId);

        if (currentUserDatingProfileOpt.isPresent()) {
            List<UserDatingProfile> candidatesMatchingCriteria = userDatingProfileService.findAllMatchingTheCriteria(currentUserDatingProfileOpt.get());
            List<Long> IDsOfSelectedCandidates = candidatesMatchingCriteria.stream().map(UserDatingProfile::getId).collect(Collectors.toList());
//            System.out.println("List<userIds>: " + IDsOfSelectedCandidates);
            return IDsOfSelectedCandidates;
        } else {
            throw new NoDataFoundException(String.format("NoDataFoundException: userDatingProfile for user %d does not exist", currentUserId));
        }

    }


}
