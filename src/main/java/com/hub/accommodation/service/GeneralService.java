package com.hub.accommodation.service;

import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.exception.NoDataFoundException;
import com.hub.accommodation.repository.RepositoryInterface;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@NoArgsConstructor
@AllArgsConstructor
@Transactional
public abstract class GeneralService<E extends BaseEntity> implements ServiceInterface<E> {
  private RepositoryInterface<E> repo;

  @Override
  public E save(E entity) {
    return repo.save(entity);
  }

  @Override
  public void delete(E entity) {
    repo.delete(entity);
  }

  @Override
  @Transactional(readOnly = true)
  public List<E> findAll() {
    return repo.findAll();
  }

  @Override
  @Transactional(readOnly = true)
  public Page<E> findAll(Pageable pageable) {
    return repo.findAll(pageable);
  }

  @Override
  public void deleteById(Long id) {
    Optional<E> entityOpt = repo.findById(id);
    if (entityOpt.isEmpty()) {
      throw new NoDataFoundException("entityOpt is empty in GeneralService::deleteById for id", String.valueOf(id));
    }

    delete(entityOpt.get());
  }

  @Override
  @Transactional(readOnly = true)
  public Optional<E> findById(Long id) {
    return repo.findById(id);
  }

  @Override
  @Transactional(readOnly = true)
  public E getOne(Long id) {
    return repo.getById(id);
  }

  @Override
  @Transactional(readOnly = true)
  public E findEntityById(Long id) {
    return repo.findEntityById(id);
  }



}