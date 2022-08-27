package com.hub.accommodation.service;

import com.hub.accommodation.domain.user.UserDatingProfile;
import com.hub.accommodation.domain.user.User;
import com.hub.accommodation.repository.UserDatingProfileRepository;
import com.hub.accommodation.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserService extends GeneralService<User> {
    private final UserRepository userRepository;
    private final UserDatingProfileRepository userDatingProfileRepository;

    public UserService(UserRepository userRepository,
                       UserDatingProfileRepository userDatingProfileRepository) {
        this.userRepository = userRepository;
        this.userDatingProfileRepository = userDatingProfileRepository;
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    public Optional<UserDatingProfile> findUserDatingProfileById(Long id) {
        return userDatingProfileRepository.findUserDatingProfileById(id);
    }

}
