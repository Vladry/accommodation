package com.hub.accommodation.DTO.response;

import com.hub.accommodation.domain.accommodation.Accommodation;
import com.hub.accommodation.domain.user.Tenant;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

public class PictureRsDto {

    private String picture;

    //TODO дооформить поля:
    private Long accommodationId;
    private Long tenantId;
    private Long datingMemberId;

}
