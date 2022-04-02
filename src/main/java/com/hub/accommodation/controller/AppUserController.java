package com.hub.accommodation.controller;

import com.hub.accommodation.DTO.AppUserFacade;
import com.hub.accommodation.DTO.AppUserRqDto;
import com.hub.accommodation.DTO.AppUserRsDto;
import com.hub.accommodation.domain.AppUser;
import com.hub.accommodation.exception.NoDataFoundException;
import com.hub.accommodation.service.AppUserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@Validated
@RestController
@RequestMapping("/app_users")
public class AppUserController {

    private final AppUserService appUserService;
    private final AppUserFacade appUserFacade;

    public AppUserController(AppUserService appUserService, AppUserFacade appUserFacade) {
        this.appUserService = appUserService;
        this.appUserFacade = appUserFacade;
    }

    @PostMapping
    public void getAppUser(@RequestBody AppUserRqDto appUserRqDto) {
        AppUser appUser = appUserFacade.convertToEntity(appUserRqDto);
        appUserService.save(appUser);
    }

    @GetMapping("/{id}")
    public AppUserRsDto findAppUserById(
            @PathVariable("id") Long id) {

        if (appUserService.getAppUserById(id).isPresent()) {
            AppUser appUser = appUserService.getAppUserById(id).get();
            return appUserFacade.convertToDto(appUser);
        } else {
            return null;
        }

    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping()
    public AppUserRsDto findAppUserByEmail(
            @RequestParam("email") String email) {
        AppUser appUser = appUserService.getAppUserByEmail(email)
                .orElseThrow(() -> new NoDataFoundException("no appUser found by this email"));
        return appUserFacade.convertToDto(appUser);
    }
}
