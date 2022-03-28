package com.hub.accommodation.facade;

import com.hub.accommodation.DTO.OwnerRqDto;
import com.hub.accommodation.DTO.OwnerRsDto;
import com.hub.accommodation.domain.Owner;
import org.springframework.stereotype.Service;

@Service
public class OwnerFacade extends GeneralFacade<Owner, OwnerRqDto, OwnerRsDto>{

        public OwnerFacade(){
            super(Owner.class, OwnerRsDto.class);
        }

}
