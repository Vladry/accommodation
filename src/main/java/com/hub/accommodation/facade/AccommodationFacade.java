package com.hub.accommodation.facade;

import com.hub.accommodation.DTO.request.AccommodationRqDto;
import com.hub.accommodation.DTO.response.AccommodationRsDto;
import com.hub.accommodation.domain.accommodation.Accommodation;
import com.hub.accommodation.domain.user.User;
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
        Converter<Long, User> ID_TO_USER =
                mappingContext -> userService.findById(mappingContext.getSource()).orElseThrow(() -> new NoDataFoundException("User not found"));

        super.getMm().typeMap(AccommodationRqDto.class, Accommodation.class)
                .addMapping(AccommodationRqDto::getAccType, Accommodation::setAccommodationType)
                .addMapping(AccommodationRqDto::getAccStatus, Accommodation::setStatus)
                .addMapping(AccommodationRqDto::getPetEnum, Accommodation::setPetsAllowed)
//                .addMappings(mappings -> mappings.using(ID_TO_USER).map(AccommodationRqDto::getMyUserId, Accommodation::setUser));
//                .addMappings(mappings -> mappings.using(ID_TO_USER).map(AccommodationRqDto::getTest, Accommodation::setUser));
                .addMappings(mappings -> mappings.using(ID_TO_USER).map(AccommodationRqDto::getUserId, Accommodation::setUser));
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
    protected void decorateEntity(Accommodation entity, AccommodationRqDto dto) {
        super.decorateEntity(entity, dto);
    }

    @Override
    protected void decorateDto(AccommodationRsDto dto, Accommodation entity) {
        super.decorateDto(dto, entity);
    }
}
