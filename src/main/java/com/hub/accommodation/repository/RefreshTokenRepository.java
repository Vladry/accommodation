package com.hub.accommodation.repository;

import com.hub.accommodation.domain.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    void deleteByExpirationDateBefore(Date date);
    Optional<RefreshToken> findRefreshTokenById(Long id);
}