package com.hub.accommodation.service;

import com.hub.accommodation.dto.response.UserAgeRsDto;
import com.hub.accommodation.domain.user.UserDB;
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
public class UserService extends GeneralService<UserDB> {
    private final UserRepository userRepository;
    private final UserRepositoryImpl userRepositoryImpl;


    public List<UserAgeRsDto> getUsersAges(List<Long> ids){
        return userRepositoryImpl.getUsersAges(ids);
    }

    public Optional<UserDB> findUserById(Long id){
        return userRepository.findUserById(id);
    }

    @Transactional(readOnly = true)
    public Optional<UserDB> getUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    public void updateParamById(Long id, String location) {
        userRepositoryImpl.updateParamById(id, location);
    }

    public void setDatingParticipationFlag(Long userId, Boolean value) {
        userRepositoryImpl.setDatingParticipationFlag(userId, value);
    }

    public void registerVisitToDating(Long id) {
        userRepositoryImpl.registerVisitToDating(id);
    }

    @Transactional(readOnly = true)
    public List<UserDB> findAllByIds(List<Long> listOfIds) {
        return userRepositoryImpl.findAllByIds(listOfIds);
    }
}
