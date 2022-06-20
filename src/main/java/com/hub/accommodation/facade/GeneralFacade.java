package com.hub.accommodation.facade;

import ch.qos.logback.core.joran.action.ImplicitAction;
import lombok.Data;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

import static org.modelmapper.config.Configuration.AccessLevel.PRIVATE;

@Data
public class GeneralFacade<E, RQ, RS> {

    private final Class<E> entityClass;
    private final Class<RS> dtoRsClass;

    private final ModelMapper mm = new ModelMapper();

    public GeneralFacade(Class<E> eClass, Class<RS> RsClass) {
        entityClass = eClass;
        dtoRsClass = RsClass;

        mm.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT)
//                .setImplicitMappingEnabled(false) // false отключит вообще все матчинги
                .setFieldMatchingEnabled(false)  //по умолчанию оно в false. Но я явно установил в false, т.к. при true он пытался маппить и поля и геттеры/сеттеры этих же полей
                .setSkipNullEnabled(true)
                .setFieldAccessLevel(PRIVATE);
    }

    public E convertToEntity(RQ requestDTO) {
        final E entity = mm.map(requestDTO, entityClass);
        decorateEntity(entity, requestDTO);
        return entity;
    }

    public RS convertToDto(E entity){
        final RS dto = mm.map(entity, dtoRsClass);
            decorateDto(dto, entity);
            return dto;
    }

    protected void decorateEntity(final E entity, final RQ dto){}
    protected void decorateDto(final RS dto, final E entity){}

}
