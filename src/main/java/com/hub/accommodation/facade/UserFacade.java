package com.hub.accommodation.facade;

import com.hub.accommodation.DTO.request.UserRqDto;
import com.hub.accommodation.DTO.response.UserRsDto;
import com.hub.accommodation.domain.user.User;
import com.hub.accommodation.exception.NoDataFoundException;
import com.hub.accommodation.service.UserService;
import org.springframework.stereotype.Component;

@Component
public class UserFacade extends GeneralFacade<User, UserRqDto, UserRsDto>{
    private final UserService userService;
    public UserFacade(UserService userService) {
        super(User.class, UserRsDto.class);
        this.userService = userService;
    }

    public UserRsDto getUserByEmail(String email) {
        return convertToDto(userService.getUserByEmail(email).orElseThrow(() -> new NoDataFoundException("User not found")));
    }
}
