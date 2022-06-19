package com.hub.accommodation.service;

import com.hub.accommodation.domain.user.DatingUserProfile;
import com.hub.accommodation.domain.user.User;
import com.hub.accommodation.repository.DatingUserProfileRepository;
import com.hub.accommodation.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserService extends GeneralService<User> {
    private final UserRepository userRepository;
    private final DatingUserProfileRepository datingUserProfileRepository;

    public UserService(UserRepository userRepository,
                       DatingUserProfileRepository datingUserProfileRepository) {
        this.userRepository = userRepository;
        this.datingUserProfileRepository = datingUserProfileRepository;
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    public Optional<DatingUserProfile> findDatingUserProfileById(Long id) {
        return datingUserProfileRepository.findDatingUserProfileById(id);
    }

}
