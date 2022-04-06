package com.hub.accommodation.facade;

import com.hub.accommodation.DTO.AccommodationRsDto;
import com.hub.accommodation.DTO.UserRqDto;
import com.hub.accommodation.DTO.UserRsDto;
import com.hub.accommodation.domain.Accommodation;
import com.hub.accommodation.domain.User;
import com.hub.accommodation.service.UserService;
import org.springframework.stereotype.Component;

@Component
public class UserFacade extends GeneralFacade<User, UserRqDto, UserRsDto>{
    private final UserService userService;
    public UserFacade(UserService userService) {
        super(User.class, UserRsDto.class);
        this.userService = userService;
    }
}
