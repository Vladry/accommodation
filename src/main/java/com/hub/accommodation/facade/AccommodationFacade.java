package com.hub.accommodation.facade;

import com.hub.accommodation.DTO.AccommodationRqDto;
import com.hub.accommodation.DTO.AccommodationRsDto;
import com.hub.accommodation.domain.Accommodation;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class AccommodationFacade extends GeneralFacade<
        Accommodation, AccommodationRqDto, AccommodationRsDto> {

    public AccommodationFacade(){
        super(Accommodation.class, AccommodationRsDto.class);
    }

    @PostConstruct
    public void init(){
        super.getMm().typeMap(AccommodationRqDto.class, Accommodation.class)
                .addMapping(AccommodationRqDto::getCountryEnum, Accommodation::setCountry)
                .addMapping(AccommodationRqDto::getAccType, Accommodation::setAccommodationType)
                .addMapping(AccommodationRqDto::getAccStatus, Accommodation::setStatus)
                .addMapping(AccommodationRqDto::getUserFromRqDto_, Accommodation::setUser_);

//        super.getMm().typeMap(Accommodation.class, AccommodationRsDto.class)
//                .addMapping(Accommodation::getAccommodationType, AccommodationRsDto::setAccommodationType);
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
