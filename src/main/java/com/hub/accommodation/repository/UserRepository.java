package com.hub.accommodation.repository;

import com.hub.accommodation.domain.user.User;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends RepositoryInterface<User> {
    Optional<User> findUserByEmail(String email);

}