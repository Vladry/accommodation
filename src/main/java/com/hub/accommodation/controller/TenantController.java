package com.hub.accommodation.controller;

import com.hub.accommodation.DTO.request.TenantRqDto;
import com.hub.accommodation.domain.user.Tenant;
import com.hub.accommodation.facade.TenantFacade;
import com.hub.accommodation.service.TenantService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/tenants")
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
}
