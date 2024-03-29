package com.hub.accommodation.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public interface ServiceInterface<E> {
    E save(E entity);

    void delete(E entity);

    void deleteById(Long id);

    List<E> findAll();

    Page<E> findAll(Pageable pageable);

    Optional<E> findById(Long id);

    E getOne(Long id);

    E findEntityById(Long id);

}