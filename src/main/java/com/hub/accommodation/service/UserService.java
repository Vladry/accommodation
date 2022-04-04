package com.hub.accommodation.service;

import com.hub.accommodation.domain.User;
import com.hub.accommodation.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void save(User appUser) {
        userRepository.save(appUser);
    }

    public User getUserById_(Long id){
        return  userRepository.getById(id);
    }

    public Optional<User> getUserById(Long id){
        return  Optional.ofNullable(userRepository.getById(id));
    }

    public Optional<User> getUserByEmail(String email){
        return userRepository.findUserByEmail(email);
    }


}
