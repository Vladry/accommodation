package com.hub.accommodation.DTO.request;

import lombok.Data;

@Data
public class RqAccPage {

    private int pageNumber;
    private int pageSize;
    String searchCriteria;

}
