package com.hub.accommodation.service;

import com.hub.accommodation.domain.user.UserDatingProfile;
import com.hub.accommodation.domain.user.User;
import com.hub.accommodation.repository.UserDatingProfileRepository;
import com.hub.accommodation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService extends GeneralService<User> {
    private final UserRepository userRepository;
    private final UserDatingProfileRepository userDatingProfileRepository;
    @PersistenceUnit
    private final EntityManagerFactory entityManagerFactory;

    @Transactional(readOnly = true)
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    public Optional<UserDatingProfile> findUserDatingProfileById(Long id) {
        return userDatingProfileRepository.findUserDatingProfileById(id);
    }

}
