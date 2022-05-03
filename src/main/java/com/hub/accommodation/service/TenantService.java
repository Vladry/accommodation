package com.hub.accommodation.service;

import com.hub.accommodation.domain.user.Tenant;
import com.hub.accommodation.repository.TenantRepository;
import org.springframework.stereotype.Service;

@Service
public class TenantService {

    private final TenantRepository tenantRepository;

    public TenantService(TenantRepository tenantRepository){
        this.tenantRepository = tenantRepository;
    }

    public void saveTenant(Tenant tenant){
        tenantRepository.save(tenant);
    }
}
