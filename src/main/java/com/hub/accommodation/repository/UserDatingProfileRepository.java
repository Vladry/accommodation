package com.hub.accommodation.repository;

import com.hub.accommodation.domain.user.UserDatingProfile;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDatingProfileRepository extends RepositoryInterface<UserDatingProfile> {
    Optional<UserDatingProfile> findUserDatingProfileById(Long id);
//    UserDatingProfile saveToId(Long userId, UserDatingProfile entity);

}
