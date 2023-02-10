package com.hub.accommodation.dto.request;

import com.hub.accommodation.domain.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

@Data
@EqualsAndHashCode(callSuper = true)
// https://urvanov.ru/2015/09/18/lombok-equalsandhashcode-%D0%BE%D0%B1%D0%BB%D0%B5%D0%B3%D1%87%D0%B0%D0%B5%D0%BC-%D1%81%D1%80%D0%B0%D0%B2%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BE%D0%B2/
@NoArgsConstructor
@AllArgsConstructor
public class AccommodationRqDto extends BaseEntity {

    @NotEmpty
    String status;
    @NotEmpty
    Long userId;
    @NotEmpty
    String location;
    @NotEmpty
    int accommodationType;
    @NotEmpty
    boolean petsAllowed;
    @NotEmpty
    @Min(1)
    int numberOfRooms;
    @NotEmpty
    @Min(1)
    int numberOfBeds=0;
    int priceTotal=0;
    int pricePerRoom=0;
    int pricePerPerson=0;
    boolean helpFindWork = false;
    boolean helpWithFood = false;
    boolean disabilityOrElderlySupport = false;
    boolean childCareSupport = false;

}