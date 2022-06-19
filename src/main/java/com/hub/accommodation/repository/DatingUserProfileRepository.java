package com.hub.accommodation.repository;

import com.hub.accommodation.domain.user.DatingUserProfile;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DatingUserProfileRepository extends RepositoryInterface<DatingUserProfile> {
    Optional<DatingUserProfile> findDatingUserProfileById(Long id);
}
