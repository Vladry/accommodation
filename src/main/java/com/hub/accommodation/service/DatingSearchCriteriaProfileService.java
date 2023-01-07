package com.hub.accommodation.service;

import com.hub.accommodation.domain.accommodation.enums.Country;
import com.hub.accommodation.domain.user.DatingSearchCriteriaProfile;
import com.hub.accommodation.domain.user.UserDatingProfile;
import com.hub.accommodation.domain.user.enums.Sex;
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

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class DatingSearchCriteriaProfileService implements ServiceInterface<DatingSearchCriteriaProfile> {
    private final DatingSearchCriteriaProfileRepository datingSearchCriteriaProfileRepository;
    private final DatingSearchCriteriaProfileFacade datingSearchCriteriaProfileFacade;


    public DatingSearchCriteriaProfileRsDto saveOrUpdate(DatingSearchCriteriaProfile entity) throws NoSuchFieldException, IllegalAccessException {
        if (entity.getId() == null) {
            return datingSearchCriteriaProfileFacade.convertToDto(datingSearchCriteriaProfileRepository.save(entity));
        } else {
            DatingSearchCriteriaProfile scp = findDatingSearchCriteriaProfileByUserId(entity.getUserId()).get();

            Field[] fields = scp.getClass().getDeclaredFields();

            for (Field field : fields) {
                field.setAccessible(true);
                Object value = field.get(entity);

                if (field.getType().equals(String.class)) {
                    if (value.equals(field.get(scp))) continue;
                }

                if (field.getType().equals(Sex.class) || field.getType().equals(Country.class)
                        || field.getType().equals(Boolean.class)) {
                    if (value == field.get(scp)) continue;
                }


                if (field.getType().equals(Long.class)) {
                    Long val = (Long) value;
                    if (val.compareTo((Long) field.get(scp)) == 0) {
                        continue;
                    }
                }

                if (field.getType().equals(Integer.class) || field.getType().equals(Integer.TYPE)) {
                    if ((int)value == (int)field.get(scp) ) {
                        continue;
                    }
                }

                System.out.println("changing value: " + value);
                field.set(scp, value);
            }
//            System.out.println("scp after change: " + scp);
            return datingSearchCriteriaProfileFacade.convertToDto(datingSearchCriteriaProfileRepository.save(scp));
        }
    }

    public Optional<DatingSearchCriteriaProfile> findDatingSearchCriteriaProfileByUserId(Long userId) {
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