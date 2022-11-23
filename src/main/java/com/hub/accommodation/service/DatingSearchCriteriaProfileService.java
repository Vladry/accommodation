package com.hub.accommodation.service;

import com.hub.accommodation.domain.user.DatingSearchCriteriaProfile;
import com.hub.accommodation.domain.user.UserDatingProfile;
import com.hub.accommodation.dto.response.DatingSearchCriteriaProfileRsDto;
import com.hub.accommodation.dto.response.UserDatingProfileRsDto;
import com.hub.accommodation.facade.DatingSearchCriteriaProfileFacade;
import com.hub.accommodation.facade.UserDatingProfileFacade;
import com.hub.accommodation.repository.UdpRepository2;
import com.hub.accommodation.repository.DatingSearchCriteriaProfileRepository;
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
public class DatingSearchCriteriaProfileService implements ServiceInterface<DatingSearchCriteriaProfile> {
    private final DatingSearchCriteriaProfileRepository datingSearchCriteriaProfileRepository;
    private final DatingSearchCriteriaProfileFacade datingSearchCriteriaProfileFacade;



    public DatingSearchCriteriaProfileRsDto saveOrUpdate(DatingSearchCriteriaProfile entity) {
        return datingSearchCriteriaProfileFacade.convertToDto(datingSearchCriteriaProfileRepository.save(entity));
    }

    public Optional<DatingSearchCriteriaProfile> findDatingSearchCriteriaProfileByUserId(Long userId){
        return datingSearchCriteriaProfileRepository.findDatingSearchCriteriaProfileByUserId(userId);
    }

    @Override
    public DatingSearchCriteriaProfile save(DatingSearchCriteriaProfile entity) {
        return null;
    }

    @Override
    public void delete(DatingSearchCriteriaProfile entity) {

    }

    @Override
    public void deleteById(Long id) {

    }

    @Override
    public List<DatingSearchCriteriaProfile> findAll() {
        return null;
    }

    @Override
    public Page<DatingSearchCriteriaProfile> findAll(Pageable pageable) {
        return null;
    }

    @Override
    public Optional<DatingSearchCriteriaProfile> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public DatingSearchCriteriaProfile getOne(Long id) {
        return null;
    }

    @Override
    public DatingSearchCriteriaProfile findEntityById(Long id) {
        return null;
    }
}