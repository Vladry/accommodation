package com.hub.accommodation.service;

import com.hub.accommodation.dto.response.UserDatingProfileRsDto;
import com.hub.accommodation.domain.user.UserDatingProfile;
import com.hub.accommodation.facade.UserDatingProfileFacade;
import com.hub.accommodation.repository.UdpRepository2;
import com.hub.accommodation.repository.UserDatingProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserDatingProfileService implements ServiceInterface<UserDatingProfile> {
    private final UserDatingProfileRepository userDatingProfileRepository;
    private final UserDatingProfileFacade userDatingProfileFacade;
    private final UdpRepository2 udpRepository2;

    //-----------------пишу новые методы:--------------------------


    //------  ГОТОВЫЕ МЕТОДЫ -----------
    /***FIND METHODS***/
    public List<UserDatingProfile> findAllMatchingTheCriteria(UserDatingProfile currentUserDatingProfile) {
        return udpRepository2.findAllMatchingTheCriteria(currentUserDatingProfile);
    }

    public void registerVisitToDating(Long id){
        udpRepository2.registerVisitToDating(id);
    }
    public Optional<UserDatingProfile> findUserDatingProfileByUserId(Long userId) {
        if (userId == null) {
            return Optional.empty();
        }
        return userDatingProfileRepository.findUserDatingProfileByUserId(userId);
    }

    @Override
    public List<UserDatingProfile> findAll() {
        return null;
    }
    @Override
    public Page<UserDatingProfile> findAll(Pageable pageable) {
        return null;
    }

// -------------не задействованные переопределения из CrudRepository--------------
    @Override
    public Optional<UserDatingProfile> findById(Long id) {
        return Optional.empty();
    }
    @Override
    public UserDatingProfile getOne(Long id) {
        return null;
    }
    @Override
    public UserDatingProfile findEntityById(Long id) {
        return null;
    }



    /***SAVE METHODS***/
    public UserDatingProfileRsDto saveOrUpdate(UserDatingProfile entity) {
        return userDatingProfileFacade.convertToDto(udpRepository2.saveCustomised(entity));
    }

    @Override
    public UserDatingProfile save(UserDatingProfile entity) {
        return userDatingProfileRepository.save(entity);
    }

    /***DELETE METHODS***/
    @Override
    public void deleteById(Long id) {

    }
    @Override
    public void delete(UserDatingProfile entity) {

    }

}