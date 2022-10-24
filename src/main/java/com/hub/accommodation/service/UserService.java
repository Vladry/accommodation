package com.hub.accommodation.service;

import com.hub.accommodation.dto.response.UserAgeRsDto;
import com.hub.accommodation.domain.user.User;
import com.hub.accommodation.repository.UserRepository;
import com.hub.accommodation.repository.UserRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional(timeout = 1000)
@RequiredArgsConstructor
public class UserService extends GeneralService<User> {
    private final UserRepository userRepository;
    private final UserRepositoryImpl userRepositoryImpl;


    public List<UserAgeRsDto> getUsersAges(List<Long> ids){
        return userRepositoryImpl.getUsersAges(ids);
    }


    @Transactional(readOnly = true)
    public Optional<User> getUserByEmail(String email) {
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
    public List<User> findAllByIds(List<Long> listOfIds) {
        return userRepositoryImpl.findAllByIds(listOfIds);
    }
}
