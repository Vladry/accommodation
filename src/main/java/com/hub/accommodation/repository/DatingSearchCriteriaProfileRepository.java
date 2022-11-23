package com.hub.accommodation.repository;

import com.hub.accommodation.domain.user.DatingSearchCriteriaProfile;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DatingSearchCriteriaProfileRepository extends RepositoryInterface<DatingSearchCriteriaProfile> {
  Optional<DatingSearchCriteriaProfile> findDatingSearchCriteriaProfileByUserId(Long userId);
}
