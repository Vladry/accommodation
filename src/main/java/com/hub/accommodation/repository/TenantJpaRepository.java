package com.hub.accommodation.repository;

import com.hub.accommodation.domain.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TenantJpaRepository extends JpaRepository<Tenant, Long> {
}
