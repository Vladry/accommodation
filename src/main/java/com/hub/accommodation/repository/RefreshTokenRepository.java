package com.hub.accommodation.repository;

import com.hub.accommodation.domain.auth.RefreshToken;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends RepositoryInterface<RefreshToken> {
    void deleteByExpirationDateBefore(Date date);
    Optional<RefreshToken> findRefreshTokenById(Long id);
}