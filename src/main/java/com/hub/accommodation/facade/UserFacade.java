package com.hub.accommodation.facade;

import com.hub.accommodation.dto.request.UserDbRqDto;
import com.hub.accommodation.dto.response.UserDbRsDto;
import com.hub.accommodation.domain.user.UserDB;
import com.hub.accommodation.exception.NoDataFoundException;
import com.hub.accommodation.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserFacade extends GeneralFacade<UserDB, UserDbRqDto, UserDbRsDto>{
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public UserFacade(UserService userService, PasswordEncoder passwordEncoder) {
        super(UserDB.class, UserDbRsDto.class);
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDbRsDto getUserByEmail(String email) {
        return convertToDto(userService.getUserByEmail(email).orElseThrow(() -> new NoDataFoundException("convertToDto failed in UserFacade::getUserByEmail-> not found by email: ")));
    }

    @Override
    public UserDB convertToEntity(UserDbRqDto requestDTO) {
        return super.convertToEntity(requestDTO);
    }

    @Override
    public UserDbRsDto convertToDto(UserDB entity) {
        return super.convertToDto(entity);
    }

    @Override
    protected void decorateEntity(UserDB entity, UserDbRqDto dto) {
        super.decorateEntity(entity, dto);
        String encodedPassword = passwordEncoder.encode(dto.getPassword());
        entity.setPassword(encodedPassword);
    }



    @Override
    protected void decorateDto(UserDbRsDto dto, UserDB entity) {
        super.decorateDto(dto, entity);
    }

}
