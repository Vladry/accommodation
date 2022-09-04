package com.hub.accommodation.repository;

import com.hub.accommodation.domain.Tenant;
import lombok.NonNull;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TenantRepository extends RepositoryInterface<Tenant> {
//@Query("select t from Tenant t where t.userId = :userId")
    Optional<Tenant> findByUserId(Long userId);

    Optional<Tenant> findById(@NonNull Long id);
}
