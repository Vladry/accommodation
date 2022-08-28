package com.hub.accommodation.controller;

import com.hub.accommodation.DTO.response.UserDatingProfileRsDto;
import com.hub.accommodation.domain.user.UserDatingProfile;
import com.hub.accommodation.facade.UserDatingProfileFacade;
import com.hub.accommodation.facade.UserFacade;
import com.hub.accommodation.service.UserDatingProfileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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


    //    @PreAuthorize("hasAuthority('read')")
    @GetMapping("/{id}/datingProfile")
    public UserDatingProfileRsDto findUserDatingProfileById(
            @PathVariable("id") Long id
    ) {
        UserDatingProfile userDatingProfile = null;
        if (userDatingProfileService.findUserDatingProfileById(id).isPresent()) {
            userDatingProfile = userDatingProfileService.findUserDatingProfileById(id).get();
            return userDatingProfileFacade.convertToDto(userDatingProfile);
        } else {
            return null;
        }

    }


    // запускать на:  http://localhost:8000/api/v1/users/1/matchingDatingCandidates
    @GetMapping("/{currentUserId}/matchingDatingCandidates")
    public List<Long> getMatchingDatingCandidatesIds(@PathVariable("currentUserId") Long currentUserId) {
        UserDatingProfile currentUserDatingProfile = userDatingProfileService.getUserDatingProfileById(currentUserId);
        List<UserDatingProfile> candidatesMatchingCriteria = userDatingProfileService.findAllMatchingTheCriteria(currentUserDatingProfile);

        List<Long> IDsOfSelectedCandidates = candidatesMatchingCriteria.stream().map(UserDatingProfile::getId).collect(Collectors.toList());
        System.out.println("List<userIds>: " + IDsOfSelectedCandidates);
        return IDsOfSelectedCandidates;
    }



}
