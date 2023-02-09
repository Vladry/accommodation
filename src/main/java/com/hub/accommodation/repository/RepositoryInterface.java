package com.hub.accommodation.repository;

import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.exception.NoDataFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RepositoryInterface<E extends BaseEntity> extends JpaRepository<E, Long> {
    default E findEntityById(Long id) {
        Optional<E> entityOptional = findById(id);
        if (entityOptional.isEmpty()) {
            throw new NoDataFoundException("entityOptional is empty in RepositoryInterface::findEntityById for id ", String.valueOf(id) );
        }
        return entityOptional.get();
    }
}
