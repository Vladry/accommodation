package com.hub.accommodation.service;

import com.hub.accommodation.domain.user.User;
import com.hub.accommodation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(timeout = 1000)
@RequiredArgsConstructor
public class UserService extends GeneralService<User> {
    private final UserRepository userRepository;
    @Transactional(readOnly = true)
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

}
