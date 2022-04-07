package com.hub.accommodation.repository;

import com.hub.accommodation.domain.accommodation.Accommodation;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccommodationRepository extends RepositoryInterface<Accommodation> {
    public List<Accommodation> findAllByUserId(Long appUserId);
}
