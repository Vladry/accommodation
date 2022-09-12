package com.hub.accommodation.repository;

import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.exception.NoDataFoundException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import java.util.List;
import java.util.Optional;

public interface RepositoryInterface<E extends BaseEntity> extends JpaRepository<E, Long> {
    default E findEntityById(Long id) {
        Optional<E> entityOptional = findById(id);
        if (entityOptional.isEmpty()) {
            String msg = String.format("An error has occurred while trying to find entity with id %d. ", id);
            throw new NoDataFoundException(msg);
        }
        return entityOptional.get();
    }
}
