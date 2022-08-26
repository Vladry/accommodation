package com.hub.accommodation.controller;

import com.hub.accommodation.DTO.response.DatingUserProfileRsDto;
import com.hub.accommodation.domain.user.DatingUserProfile;
import com.hub.accommodation.exception.CreatingEntityFailed;
import com.hub.accommodation.facade.DatingUserProfileFacade;
import com.hub.accommodation.facade.UserFacade;
import com.hub.accommodation.DTO.request.UserRqDto;
import com.hub.accommodation.DTO.response.UserRsDto;
import com.hub.accommodation.domain.user.User;
import com.hub.accommodation.exception.NoDataFoundException;
import com.hub.accommodation.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Validated
@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    private final UserFacade userFacade;
    private final DatingUserProfileFacade datingUserProfileFacade;

    public UserController(UserService userService, UserFacade userFacade, DatingUserProfileFacade datingUserProfileFacade) {
        this.userService = userService;
        this.userFacade = userFacade;
        this.datingUserProfileFacade = datingUserProfileFacade;
    }

    //------------------------------------------------
//    @PreAuthorize("hasAuthority('read')")
    @GetMapping("/{id}")
    public UserRsDto findUserById(
            @PathVariable("id") Long id) {
        Optional<User> optionalUser = userService.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return userFacade.convertToDto(user);
        } else {
            return null;
        }

    }
//------------------------------------------------

    //    @PreAuthorize("hasAuthority('read')")
    @GetMapping("/{id}/datingProfile")
    public DatingUserProfileRsDto findUserDatingProfileById(
            @PathVariable("id") Long id
    ) {
        DatingUserProfile datingUserProfile = null;
        if (userService.findDatingUserProfileById(id).isPresent()) {
            datingUserProfile = userService.findDatingUserProfileById(id).get();
            return datingUserProfileFacade.convertToDto(datingUserProfile);
        } else {return null;}

    }

    @PostMapping
    public UserRsDto createUser(@RequestBody UserRqDto userRqDto) {
        try {
            User user = userFacade.convertToEntity(userRqDto);
            userService.save(user);
            log.info("in createUser: new user (user.name: "+userRqDto.getName()+" "+ userRqDto.getLastName()+" created");
            return findUserByEmail(user.getEmail());
        } catch (Exception e) {
            log.error("error creating a new user: " +userRqDto.getName()+" "+ userRqDto.getLastName());
            throw new CreatingEntityFailed("error creating a new user");
        }
    }

    @PreAuthorize("hasAuthority('read')")
    @GetMapping("/profile")
    public UserRsDto getUserProfile(Principal principal) {
        return userFacade.getUserByEmail(principal.getName());
    }


    @PreAuthorize("hasAuthority('read')")
    @GetMapping()
    public UserRsDto findUserByEmail(
            @RequestParam("email") String email) {
        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new NoDataFoundException("no User found by this email")); //https://habr.com/ru/post/346782/
        return userFacade.convertToDto(user);
    }


    //    @PreAuthorize("hasAuthority('read')")
    @GetMapping("/all")
    public List<UserRsDto> findAll() {
        return userService.findAll().stream().map(userFacade::convertToDto).collect(Collectors.toList());
    }
}
