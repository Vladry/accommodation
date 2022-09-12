package com.hub.accommodation.service;

import com.hub.accommodation.DTO.request.UserDatingProfileRqDto;
import com.hub.accommodation.DTO.response.UserDatingProfileRsDto;
import com.hub.accommodation.domain.user.UserDatingProfile;
import com.hub.accommodation.domain.user.enums.Sex;
import com.hub.accommodation.facade.UserDatingProfileFacade;
import com.hub.accommodation.repository.UdpRepository2;
import com.hub.accommodation.repository.UserDatingProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
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
    public UserDatingProfileRsDto saveOrUpdate(UserDatingProfile entity) {
//        System.out.println("in userDatingProfileService.saveOnly ->");
        return userDatingProfileFacade.convertToDto(udpRepository2.saveCustom(entity));
    }
/*    // старый метод сохранения, с некорректным использованием CrudRepo методом save:
    public UserDatingProfileRsDto saveByUserId(UserDatingProfileRqDto udpRqDto)
{
        UserDatingProfile newUserDatingProfile = userDatingProfileFacade.convertToEntity(udpRqDto);
        Optional<UserDatingProfile> oldProfileByIdOpt = findUserDatingProfileByUserId(newUserDatingProfile.getUserId());
        Long entityId;
        if (oldProfileByIdOpt.isPresent()) {
            entityId = oldProfileByIdOpt.get().getId();
            newUserDatingProfile.setId(entityId);
            try {
                userDatingProfileRepository.save(newUserDatingProfile);
                Optional<UserDatingProfile> controlOpt = userDatingProfileRepository.findById(entityId);
                if (controlOpt.isPresent()) {
                    return userDatingProfileFacade.convertToDto(newUserDatingProfile);
                } else {
                    return null;
                }
            } catch (Exception e) {
                System.out.println("Exception in saveByUserId-> section 1(finding old entity)");
                return null;
            }
        } else {
            try {
                userDatingProfileRepository.save(newUserDatingProfile);
                Optional<UserDatingProfile> controlOpt = findUserDatingProfileByUserId(newUserDatingProfile.getUserId());
                return controlOpt.map(userDatingProfileFacade::convertToDto).orElse(null);
            } catch (Exception e) {
                System.out.println("Exception in saveByUserId-> section 2 (saving new entity and re-getting it from DB");
                return null;
            }
        }
    }*/


    public Optional<UserDatingProfile> findUserDatingProfileByUserId(Long userId) {
        if (userId == null) {
            return Optional.empty();
        }
        System.out.println("in findUserDatingProfileByUserId->  userId: " + userId);
        return userDatingProfileRepository.findUserDatingProfileByUserId(userId);

/*        EntityManager em = entityManagerFactory.createEntityManager();
        UserDatingProfile udp;
        try {
            Query q = em.createQuery("select udp from UserDatingProfile udp where udp.userId = :userId")
                    .setParameter("userId", userId);
            udp = (UserDatingProfile) q.getSingleResult();
            System.out.println("udp: " + udp);
            em.close();
            return Optional.ofNullable(udp);
        } catch (Exception e) {
            if (em != null) {
                em.close();
            }
            System.out.println("Exception in service.findUserDatingProfileByUserId(Long userId) Or userDatingProfile not found");
            return Optional.empty();
        }*/

    }

    @Override
    public UserDatingProfile save(UserDatingProfile entity) {
        return userDatingProfileRepository.save(entity);
    }

    @Override
    public void delete(UserDatingProfile entity) {

    }


    @Override
    public List<UserDatingProfile> findAll() {
        return null;
    }

    @Override
    public Page<UserDatingProfile> findAll(Pageable pageable) {
        return null;
    }


    public List<UserDatingProfile> findAllMatchingTheCriteria(UserDatingProfile currentUserDatingProfile) {
        return udpRepository2.findAllMatchingTheCriteria(currentUserDatingProfile);
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

    @Override
    public void deleteById(Long id) {

    }


}