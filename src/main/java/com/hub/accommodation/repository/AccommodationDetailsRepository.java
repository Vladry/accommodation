package com.hub.accommodation.repository;

import com.hub.accommodation.domain.AccommodationMain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccommodationDetailsRepository extends JpaRepository<AccommodationMain, Long> {
}
