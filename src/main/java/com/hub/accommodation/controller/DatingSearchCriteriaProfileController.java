package com.hub.accommodation.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.hub.accommodation.config.Views;
import com.hub.accommodation.domain.user.DatingSearchCriteriaProfile;
import com.hub.accommodation.dto.request.DatingSearchCriteriaProfileRqDto;
import com.hub.accommodation.dto.request.UserDatingProfileRqDto;
import com.hub.accommodation.dto.response.DatingSearchCriteriaProfileRsDto;
import com.hub.accommodation.dto.response.UserDatingProfileRsDto;
import com.hub.accommodation.facade.DatingSearchCriteriaProfileFacade;
import com.hub.accommodation.facade.UserDatingProfileFacade;
import com.hub.accommodation.service.DatingSearchCriteriaProfileService;
import com.hub.accommodation.service.UserDatingProfileService;
import com.hub.accommodation.util.JsonToDtoConverter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@Validated
@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/users")
public class DatingSearchCriteriaProfileController {

    private final DatingSearchCriteriaProfileService datingSearchCriteriaProfileService;
    private final DatingSearchCriteriaProfileFacade datingSearchCriteriaProfileFacade;

    //------------------------------------------------

    @ResponseStatus(code = HttpStatus.CREATED)
    @PostMapping("/datingSearchCriteriaProfile")
    public DatingSearchCriteriaProfileRsDto saveByUserId(
            @RequestBody String jsonString) {
        JsonToDtoConverter<DatingSearchCriteriaProfileRqDto> converter = new JsonToDtoConverter<>(DatingSearchCriteriaProfileRqDto.class);
        DatingSearchCriteriaProfileRqDto scpRqDto = converter.doConvert(jsonString);
        DatingSearchCriteriaProfile scp = datingSearchCriteriaProfileFacade.convertToEntity(scpRqDto);
        return datingSearchCriteriaProfileService.saveOrUpdate(scp);
    }


    //    @PreAuthorize("hasAuthority('read')")
    @JsonView(Views.Public.class)
    @GetMapping("/datingSearchCriteriaProfile/{id}")
    public DatingSearchCriteriaProfileRsDto findDatingSearchCriteriaProfileByUserId(@PathVariable("id") Long id) {
        if (id == null) {return null;}
        Optional<DatingSearchCriteriaProfile> scpOpt = datingSearchCriteriaProfileService.findDatingSearchCriteriaProfileByUserId(id);
        return scpOpt.map(datingSearchCriteriaProfileFacade::convertToDto).orElse(null);
    }


}
