package com.hub.accommodation.repository;

import com.hub.accommodation.domain.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoJpaRepository extends JpaRepository<Photo, Long> {
}
