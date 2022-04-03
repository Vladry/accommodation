package com.hub.accommodation.facade;

import com.hub.accommodation.DTO.AppUserRqDto;
import com.hub.accommodation.DTO.AppUserRsDto;
import com.hub.accommodation.domain.AppUser;
import com.hub.accommodation.facade.GeneralFacade;
import lombok.Data;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class AppUserFacade extends GeneralFacade<AppUser, AppUserRqDto, AppUserRsDto> {
    public AppUserFacade() {
        super(AppUser.class, AppUserRsDto.class);
    }

    @PostConstruct
    public void init() {
        super.getMm().typeMap(AppUser.class, AppUserRsDto.class)
                .addMapping(AppUser::getCountryString, AppUserRsDto::setCountry);
        super.getMm().typeMap(AppUserRqDto.class, AppUser.class)
                .addMapping(AppUserRqDto::getCountryFromOrdinal, AppUser::setCountry);
    }

    @Override
    public AppUser convertToEntity(AppUserRqDto requestDTO) {
        return super.convertToEntity(requestDTO);
    }

    @Override
    public AppUserRsDto convertToDto(AppUser entity) {
        return super.convertToDto(entity);
    }

    @Override
    protected void decorateEntity(AppUser entity, AppUserRqDto dto) {
        super.decorateEntity(entity, dto);
    }

    @Override
    protected void decorateDto(AppUserRsDto dto, AppUser entity) {
        super.decorateDto(dto, entity);
    }
}
