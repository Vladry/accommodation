package com.hub.accommodation.controller;

import com.hub.accommodation.DTO.request.UserRqDto;
import com.hub.accommodation.DTO.response.UserRsDto;
import com.hub.accommodation.domain.user.User;
import com.hub.accommodation.domain.user.UserDatingProfile;
import com.hub.accommodation.exception.CreatingEntityFailed;
import com.hub.accommodation.exception.NoDataFoundException;
import com.hub.accommodation.facade.UserFacade;
import com.hub.accommodation.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Validated
@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    private final UserFacade userFacade;

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

    @PostMapping
    public UserRsDto createUser(@RequestBody UserRqDto userRqDto) {
        try {
            User user = userFacade.convertToEntity(userRqDto);
            userService.save(user);
            log.info("in createUser: new user (user.name: " + userRqDto.getName() + " " + userRqDto.getLastName() + " created");
            return findUserByEmail(user.getEmail());
        } catch (Exception e) {
            log.error("error creating a new user: " + userRqDto.getName() + " " + userRqDto.getLastName());
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

    @PostMapping("/allByIds")
    public List<UserRsDto> findAllById(@RequestBody List<Long> ids) {
        System.out.println("in findAllById");
        if(ids.isEmpty()){
            System.out.println("findAllById argument ids is empty - returning empty List<UserRsDto>");
            return new ArrayList<>();
        }
        return userService.findAllById(ids).stream().map(userFacade::convertToDto).collect(Collectors.toList());
    }





}
