package com.hub.accommodation.facade;

import com.hub.accommodation.DTO.UserRqDto;
import com.hub.accommodation.DTO.UserRsDto;
import com.hub.accommodation.domain.User;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class UserFacade extends GeneralFacade<User, UserRqDto, UserRsDto> {
    public UserFacade() {
        super(User.class, UserRsDto.class);
    }

    @PostConstruct
    public void init() {
        super.getMm().typeMap(User.class, UserRsDto.class)
                .addMapping(User::getCountryString, UserRsDto::setCountry);
        super.getMm().typeMap(UserRqDto.class, User.class)
                .addMapping(UserRqDto::getCountryFromOrdinal, User::setCountry);
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
    }

    @Override
    protected void decorateDto(UserRsDto dto, User entity) {
        super.decorateDto(dto, entity);
    }
}
