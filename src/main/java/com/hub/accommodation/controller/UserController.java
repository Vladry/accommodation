package com.hub.accommodation.controller;

import com.hub.accommodation.dto.request.UserDbRqDto;
import com.hub.accommodation.dto.response.UserAgeRsDto;
import com.hub.accommodation.dto.response.UserDbRsDto;
import com.hub.accommodation.domain.user.UserDB;
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
    public UserDbRsDto findUserById(
            @PathVariable("id") Long id) {
        Optional<UserDB> optionalUser = userService.findUserById(id);
        if (optionalUser.isPresent()) {
            UserDB user = optionalUser.get();
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
    public UserDbRsDto createUser(@RequestBody UserDbRqDto userRqDto) {
        try {
            UserDB user = userFacade.convertToEntity(userRqDto);
            userService.save(user);
            return findUserByEmail(user.getEmail());
        } catch (Exception e) {
            throw new CreatingEntityFailed("new user in UserController::createUser");
        }
    }

    @PreAuthorize("hasAuthority('guest_access')")
    @GetMapping("/users/profile")
    public UserDbRsDto getUserProfile(Principal principal) {
        return userFacade.getUserByEmail(principal.getName());
    }


    @PreAuthorize("hasAuthority('guest_access')")
    @GetMapping("/users")
    public UserDbRsDto findUserByEmail(
            @RequestParam("email") String email) {
        UserDB user = userService.getUserByEmail(email)
                .orElseThrow(() -> new NoDataFoundException("user in UserController::findUserByEmail" +email)); //https://habr.com/ru/post/346782/
        return userFacade.convertToDto(user);
    }


    //    @PreAuthorize("hasAuthority('read')")
    @GetMapping("/users/all")
    public List<UserDbRsDto> findAll() {
        return userService.findAll().stream().map(userFacade::convertToDto).collect(Collectors.toList());
    }

    @PostMapping("/users/allByIds")
    public List<UserDbRsDto> findAllById(@RequestBody List<Long> ids) {
        if (ids.isEmpty()) {
            log.warn("in /allByIds, argument ids is empty - returning empty List<UserRsDto>");
            return new ArrayList<>();
        }
        List<UserDB> users = userService.findAllByIds(ids);
        List<UserAgeRsDto> listUserAgeRsDtos = userService.getUsersAges(ids);
        List<UserDbRsDto> listusers = users.stream().map(userFacade::convertToDto).collect(Collectors.toList());

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
