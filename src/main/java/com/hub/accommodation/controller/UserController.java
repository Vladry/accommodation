package com.hub.accommodation.controller;

import com.hub.accommodation.dto.request.UserRqDto;
import com.hub.accommodation.dto.response.UserAgeRsDto;
import com.hub.accommodation.dto.response.UserRsDto;
import com.hub.accommodation.domain.user.User;
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
@RequestMapping("/api/v1")
public class UserController {

    private final UserService userService;
    private final UserFacade userFacade;

    //------------------------------------------------
//    @PreAuthorize("hasAuthority('read')")
    @GetMapping("/users/{id}")
    public UserRsDto findUserById(
            @PathVariable("id") Long id) {
        Optional<User> optionalUser = userService.findUserById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return userFacade.convertToDto(user);
        } else {
            return null;
        }

    }

    //------------------------------------------------
    @GetMapping("/users/visits/{id}")
    public void registerVisitToDating(@PathVariable("id") Long id) {
        userService.registerVisitToDating(id);
    }

    @PutMapping("/users/{id}")
    public void updateUser(@PathVariable("id") Long id, @RequestParam("location") String location) {
        userService.updateParamById(id, location);
    }


    @PostMapping("/users")
    public UserRsDto createUser(@RequestBody UserRqDto userRqDto) {
        try {
            User user = userFacade.convertToEntity(userRqDto);
            userService.save(user);
            return findUserByEmail(user.getEmail());
        } catch (Exception e) {
            throw new CreatingEntityFailed("new user in UserController::createUser");
        }
    }

    @PreAuthorize("hasAuthority('read')")
    @GetMapping("/users/profile")
    public UserRsDto getUserProfile(Principal principal) {
        return userFacade.getUserByEmail(principal.getName());
    }


    @PreAuthorize("hasAuthority('read')")
    @GetMapping("/users")
    public UserRsDto findUserByEmail(
            @RequestParam("email") String email) {
        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new NoDataFoundException("user in UserController::findUserByEmail" +email)); //https://habr.com/ru/post/346782/
        return userFacade.convertToDto(user);
    }


    //    @PreAuthorize("hasAuthority('read')")
    @GetMapping("/users/all")
    public List<UserRsDto> findAll() {
        return userService.findAll().stream().map(userFacade::convertToDto).collect(Collectors.toList());
    }

    @PostMapping("/users/allByIds")
    public List<UserRsDto> findAllById(@RequestBody List<Long> ids) {
        if (ids.isEmpty()) {
            log.warn("in /allByIds, argument ids is empty - returning empty List<UserRsDto>");
            return new ArrayList<>();
        }
        List<User> users = userService.findAllByIds(ids);
        List<UserAgeRsDto> listUserAgeRsDtos = userService.getUsersAges(ids);
        List<UserRsDto> listusers = users.stream().map(userFacade::convertToDto).collect(Collectors.toList());

        listusers = listusers.stream().map(user -> {
            for (UserAgeRsDto userAgeData : listUserAgeRsDtos) {
                if (userAgeData.getUserId().equals(user.getId())) {
                    user.setAge( userAgeData.getAge() );
                    return user;
                }

            }
            return user;
        }).collect(Collectors.toList());
        return listusers;
    }


}
