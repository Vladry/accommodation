package com.hub.accommodation.repository;

import com.hub.accommodation.domain.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OwnerRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findOwnerByEmail(String email);
}