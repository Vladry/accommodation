package com.hub.accommodation.controller;

import com.hub.accommodation.facade.UserFacade;
import com.hub.accommodation.DTO.request.UserRqDto;
import com.hub.accommodation.DTO.response.UserRsDto;
import com.hub.accommodation.domain.user.User;
import com.hub.accommodation.exception.NoDataFoundException;
import com.hub.accommodation.service.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;


@Validated
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService appUserService;
    private final UserFacade UserFacade;

    public UserController(UserService UserService, UserFacade UserFacade) {
        this.appUserService = UserService;
        this.UserFacade = UserFacade;
    }

    @PostMapping
    public void createUser(@RequestBody UserRqDto userRqDto) {
        User user = UserFacade.convertToEntity(userRqDto);
        appUserService.save(user);
    }

    @PreAuthorize("hasAuthority('read')")
    @GetMapping("/profile")
    public UserRsDto getUserProfile(Principal principal) {
        return UserFacade.getUserByEmail(principal.getName());
    }

    @GetMapping("/{id}")
    public UserRsDto findUserById(
            @PathVariable("id") Long id) {


        Optional<User> optionalUser = appUserService.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return UserFacade.convertToDto(user);
        } else {
            return null;
        }

    }

    @GetMapping()
    public UserRsDto findUserByEmail(
            @RequestParam("email") String email) {
        User user = appUserService.getUserByEmail(email)
                .orElseThrow(() -> new NoDataFoundException("no appUser found by this email"));
        return UserFacade.convertToDto(user);
    }
}
