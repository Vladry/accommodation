package com.hub.accommodation.facade;

import com.hub.accommodation.DTO.request.DatingUserProfileRqDto;
import com.hub.accommodation.DTO.response.DatingUserProfileRsDto;
import com.hub.accommodation.domain.user.DatingUserProfile;
import org.springframework.stereotype.Component;

@Component
public class DatingUserProfileFacade extends
        GeneralFacade<DatingUserProfile, DatingUserProfileRqDto, DatingUserProfileRsDto> {

    public DatingUserProfileFacade() {
        super(DatingUserProfile.class, DatingUserProfileRsDto.class);
    }
}
