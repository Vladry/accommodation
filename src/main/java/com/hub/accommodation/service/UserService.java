package com.hub.accommodation.service;

import com.hub.accommodation.domain.user.User;
import com.hub.accommodation.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserService extends GeneralService<User> {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserByEmail(String email){
        return userRepository.findUserByEmail(email);
    }


}
