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
//        System.out.println("in service.findUserDatingProfileByUserId->  userId: " + userId);
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
//        System.out.println("in userDatingProfileService.saveOnly ->");
        return userDatingProfileFacade.convertToDto(udpRepository2.saveCustomised(entity));
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