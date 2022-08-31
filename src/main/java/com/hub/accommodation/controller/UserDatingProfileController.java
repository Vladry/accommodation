package com.hub.accommodation.controller;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hub.accommodation.DTO.request.UserDatingProfileRqDto;
import com.hub.accommodation.DTO.response.UserDatingProfileRsDto;
import com.hub.accommodation.domain.user.UserDatingProfile;
import com.hub.accommodation.exception.NoDataFoundException;
import com.hub.accommodation.facade.UserDatingProfileFacade;
import com.hub.accommodation.service.UserDatingProfileService;
import com.hub.accommodation.util.JsonEntityConverter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.DataInput;
import java.io.File;
import java.io.IOException;
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
    public void saveById(@RequestBody String userDatingProfileValues) throws IOException {
//        ObjectMapper mapper = new ObjectMapper();
//        UserDatingProfileRqDto udpRqDto = mapper.readValue(userDatingProfileValues, UserDatingProfileRqDto.class);

        JsonEntityConverter<UserDatingProfileRqDto> conv = new JsonEntityConverter<>(UserDatingProfileRqDto.class);
        UserDatingProfileRqDto udpRqDto = conv.jsonConvert(userDatingProfileValues, UserDatingProfileRqDto.class);
        System.out.println("converted from JSON udpRsDto: " + udpRqDto);
//        userDatingProfileService.saveById(userDatingProfileValues);
    }




    //    @PreAuthorize("hasAuthority('read')")
    @GetMapping("/{id}/datingProfile")
    public UserDatingProfileRsDto findUserDatingProfileById(
            @PathVariable("id") Long id
    ) {
        if (id == null) {
            return null;
        }
        UserDatingProfile userDatingProfile = null;
        if (userDatingProfileService.findUserDatingProfileById(id).isPresent()) {
            userDatingProfile = userDatingProfileService.findUserDatingProfileById(id).get();
            UserDatingProfileRsDto userDatingProfileRsDto = userDatingProfileFacade.convertToDto(userDatingProfile);
            System.out.println("userDatingProfileRsDto: "+ userDatingProfileRsDto);
            return userDatingProfileRsDto;
        } else {
            return null;
        }

    }


    // запускать на:  http://localhost:8000/api/v1/users/1/matchingDatingCandidatesIds
    @CrossOrigin(origins = "*")
    @GetMapping("/{currentUserId}/matchingDatingCandidatesIds")
    public List<Long> getMatchingDatingCandidatesIds(@PathVariable("currentUserId") Long currentUserId) {
        if (currentUserId == null) {
            System.out.println("getMatchingDatingCandidatesIds argument currentUserId is null: returning null");
            return null;
        }
        Optional<UserDatingProfile> currentUserDatingProfileOpt = userDatingProfileService.findUserDatingProfileById(currentUserId);

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
