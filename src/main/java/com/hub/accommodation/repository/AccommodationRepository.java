package com.hub.accommodation.repository;

import com.hub.accommodation.domain.Accommodation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {
    public List<Accommodation> findAllByUserId(Long appUserId);
}
