package com.hub.accommodation.controller;

import com.hub.accommodation.facade.UserFacade;
import com.hub.accommodation.DTO.UserRqDto;
import com.hub.accommodation.DTO.UserRsDto;
import com.hub.accommodation.domain.User;
import com.hub.accommodation.exception.NoDataFoundException;
import com.hub.accommodation.service.UserService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@Validated
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService appUserService;
    private final UserFacade UserFacade;

    public UserController(UserService UserService, UserFacade UserFacade) {
        this.appUserService = UserService;
        this.UserFacade = UserFacade;
    }

    @PostMapping
    public void getUser(@RequestBody UserRqDto userRqDto) {
        User user = UserFacade.convertToEntity(userRqDto);
        appUserService.save(user);
    }

    @GetMapping("/{id}")
    public UserRsDto findAppUserById(
            @PathVariable("id") Long id) {

        if (appUserService.getUserById(id).isPresent()) {
            User user = appUserService.getUserById(id).get();
            return UserFacade.convertToDto(user);
        } else {
            return null;
        }

    }

//    @PreAuthorize("hasAuthority('USER')")
    @GetMapping()
    public UserRsDto findUserByEmail(
            @RequestParam("email") String email) {
        User user = appUserService.getUserByEmail(email)
                .orElseThrow(() -> new NoDataFoundException("no appUser found by this email"));
        return UserFacade.convertToDto(user);
    }
}
