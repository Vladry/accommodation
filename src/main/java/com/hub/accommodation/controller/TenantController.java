package com.hub.accommodation.controller;

import com.hub.accommodation.dto.request.TenantRqDto;
import com.hub.accommodation.dto.response.TenantRsDto;
import com.hub.accommodation.domain.Tenant;
import com.hub.accommodation.facade.TenantFacade;
import com.hub.accommodation.service.TenantService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Slf4j
@Validated
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("${api.ver}/tenants")
public class TenantController {

    private final TenantService tenantService;
    private final TenantFacade tenantFacade;

    public TenantController(TenantService tenantService, TenantFacade tenantFacade){
        this.tenantFacade = tenantFacade;
        this.tenantService = tenantService;
    }

    @PostMapping
    public void saveTenant(@RequestBody TenantRqDto tenantRqDto){
        Tenant tenant = tenantFacade.convertToEntity(tenantRqDto);
        tenantService.saveTenant(tenant);
    }

    @GetMapping("/{userId}")
    public TenantRsDto findTenantProfileByUserId(@PathVariable("userId") Long userId){
        Optional<Tenant> tOpt = tenantService.findTenantProfileById(userId);
        if (tOpt.isPresent()) {
//            System.out.println("tOpt: " + tOpt.get());
            TenantRsDto tRsDto = tenantFacade.convertToDto(tOpt.get());
            return tRsDto;
        } else {
            log.error("returning Tenant: null");
            return null;
        }

    }
}
