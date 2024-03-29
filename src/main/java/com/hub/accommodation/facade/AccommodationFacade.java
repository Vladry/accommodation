package com.hub.accommodation.facade;

import com.hub.accommodation.dto.request.AccommodationRqDto;
import com.hub.accommodation.dto.response.AccommodationRsDto;
import com.hub.accommodation.domain.accommodation.Accommodation;
import com.hub.accommodation.domain.user.UserDB;
import com.hub.accommodation.exception.NoDataFoundException;
import com.hub.accommodation.service.UserService;
import org.modelmapper.Converter;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class AccommodationFacade extends GeneralFacade<
        Accommodation, AccommodationRqDto, AccommodationRsDto> {
    private final UserService userService;

    public AccommodationFacade(UserService userService) {
        super(Accommodation.class, AccommodationRsDto.class);
        this.userService = userService;
    }

    @PostConstruct
    public void init() {
        Converter<Long, UserDB> ID_TO_USER =
                mappingContext -> userService.findById(mappingContext.getSource()).orElseThrow(() -> new NoDataFoundException("AccommodationFacade::init()::userService.findById"));

        super.getMm().typeMap(Accommodation.class, AccommodationRsDto.class)
                .addMapping(Accommodation::getAccommodationType, AccommodationRsDto::setAccommodationType);
    }


    @Override
    public Accommodation convertToEntity(AccommodationRqDto requestDTO) {
        return super.convertToEntity(requestDTO);
    }

    @Override
    public AccommodationRsDto convertToDto(Accommodation entity) {
        return super.convertToDto(entity);
    }

    @Override
    public void decorateEntity(Accommodation entity, AccommodationRqDto dto) {
        super.decorateEntity(entity, dto);
    }

    @Override
    public void decorateDto(AccommodationRsDto dto, Accommodation entity) {
        super.decorateDto(dto, entity);
    }
}
