package com.hub.accommodation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PictureRsDto {

    private String picture;

    //TODO дооформить поля:
    private Long accommodationId;
    private Long tenantId;
    private Long datingMemberId;

}
