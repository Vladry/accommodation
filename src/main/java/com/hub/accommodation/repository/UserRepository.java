package com.hub.accommodation.repository;

import com.hub.accommodation.domain.user.UserDB;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends RepositoryInterface<UserDB> {
    Optional<UserDB> findUserByEmail(String email);
    Optional<UserDB> findUserById(Long id);
}