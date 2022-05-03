package com.hub.accommodation.repository;

import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.exception.NoDataFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RepositoryInterface<E extends BaseEntity> extends JpaRepository<E, Long> {
    default E findEntityById(Long id) {
        Optional<E> entityOptional = findById(id);
        if (!entityOptional.isPresent()) {
            String msg = String.format("An error has occurred while trying to find entity with id %d. ", id);
            throw new NoDataFoundException(msg);
        }
        return entityOptional.get();
    }
}
