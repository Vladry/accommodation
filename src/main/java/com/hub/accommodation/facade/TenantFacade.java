package com.hub.accommodation.facade;

import com.hub.accommodation.domain.Tenant;
import com.hub.accommodation.DTO.TenantRqDto;
import com.hub.accommodation.DTO.TenantRsDto;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class TenantFacade extends GeneralFacade<
        Tenant, TenantRqDto, TenantRsDto> {

    public TenantFacade(){
        super(Tenant.class, TenantRsDto.class);
    }

    @PostConstruct
    public void init(){
        super.getMm().typeMap(TenantRqDto.class, Tenant.class)
                .addMapping(TenantRqDto::getLengthOfStay, Tenant::setDesiredLengthOfStay);

        super.getMm().typeMap(Tenant.class, TenantRsDto.class)
                .addMapping(Tenant::getDesiredLengthOfStayEnum, TenantRsDto::setDesiredLengthOfStay);
    }

    @Override
    public Tenant convertToEntity(TenantRqDto requestDTO) {
        return super.convertToEntity(requestDTO);
    }

    @Override
    public TenantRsDto convertToDto(Tenant entity) {
        return super.convertToDto(entity);
    }

    @Override
    protected void decorateEntity(Tenant entity, TenantRqDto dto) {
        super.decorateEntity(entity, dto);
    }

    @Override
    protected void decorateDto(TenantRsDto dto, Tenant entity) {
        super.decorateDto(dto, entity);
    }
}
