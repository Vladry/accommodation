package com.hub.accommodation.facade;

import com.hub.accommodation.domain.user.DatingSearchCriteriaProfile;
import com.hub.accommodation.dto.request.DatingSearchCriteriaProfileRqDto;
import com.hub.accommodation.dto.response.DatingSearchCriteriaProfileRsDto;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class DatingSearchCriteriaProfileFacade extends
        GeneralFacade<DatingSearchCriteriaProfile, DatingSearchCriteriaProfileRqDto, DatingSearchCriteriaProfileRsDto> {

    public DatingSearchCriteriaProfileFacade() {
        super(DatingSearchCriteriaProfile.class, DatingSearchCriteriaProfileRsDto.class);
    }

    @PostConstruct
    public void init() {}

}