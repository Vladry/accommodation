package com.hub.accommodation.service;

import com.hub.accommodation.domain.user.User;
import com.hub.accommodation.repository.UserRepository;
import com.hub.accommodation.repository.UserRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(timeout = 1000)
@RequiredArgsConstructor
public class UserService extends GeneralService<User> {
    private final UserRepository userRepository;
    private final UserRepositoryImpl userRepositoryImpl;
    @Transactional(readOnly = true)
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }



    @Transactional(readOnly = true)
    public List<User> findAllByIds(List<Long> listOfIds) {
        return userRepositoryImpl.findAllByIds(listOfIds);
    }
}
