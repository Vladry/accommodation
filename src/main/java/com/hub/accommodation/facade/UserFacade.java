package com.hub.accommodation.facade;

import com.hub.accommodation.dto.request.UserRqDto;
import com.hub.accommodation.dto.response.UserRsDto;
import com.hub.accommodation.domain.user.User;
import com.hub.accommodation.exception.NoDataFoundException;
import com.hub.accommodation.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserFacade extends GeneralFacade<User, UserRqDto, UserRsDto>{
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public UserFacade(UserService userService, PasswordEncoder passwordEncoder) {
        super(User.class, UserRsDto.class);
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    public UserRsDto getUserByEmail(String email) {
        return convertToDto(userService.getUserByEmail(email).orElseThrow(() -> new NoDataFoundException("User not found")));
    }

    @Override
    public User convertToEntity(UserRqDto requestDTO) {
        return super.convertToEntity(requestDTO);
    }

    @Override
    public UserRsDto convertToDto(User entity) {
        return super.convertToDto(entity);
    }

    @Override
    protected void decorateEntity(User entity, UserRqDto dto) {
        super.decorateEntity(entity, dto);
        String encodedPassword = passwordEncoder.encode(dto.getPassword());
        entity.setPassword(encodedPassword);
    }



    @Override
    protected void decorateDto(UserRsDto dto, User entity) {
        super.decorateDto(dto, entity);
    }

}
