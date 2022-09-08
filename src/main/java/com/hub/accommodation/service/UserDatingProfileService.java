package com.hub.accommodation.service;

import com.hub.accommodation.DTO.request.UserDatingProfileRqDto;
import com.hub.accommodation.DTO.response.UserDatingProfileRsDto;
import com.hub.accommodation.domain.user.UserDatingProfile;
import com.hub.accommodation.domain.user.enums.Sex;
import com.hub.accommodation.facade.UserDatingProfileFacade;
import com.hub.accommodation.repository.UserDatingProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import javax.persistence.Query;
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
    @PersistenceUnit
    private final EntityManagerFactory entityManagerFactory;

    //-----------------methods--------------------------






    //------  ГОТОВЫЕ МЕТОДЫ -----------
    public UserDatingProfileRsDto saveByUserId(UserDatingProfileRqDto udpRqDto) {
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
                if (controlOpt.isPresent()) {
                    return userDatingProfileFacade.convertToDto(controlOpt.get());
                } else {
                    return null;
                }
            } catch (Exception e) {
                System.out.println("Exception in saveByUserId-> section 2 (saving new entity and re-getting it from DB");
                return null;
            }
        }
    }

    public Optional<UserDatingProfile> findUserDatingProfileByUserId(Long userId) {
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
    public void deleteById(Long id) {

    }

    @Override
    public List<UserDatingProfile> findAll() {
        return null;
    }

    @Override
    public Page<UserDatingProfile> findAll(Pageable pageable) {
        return null;
    }


    //-----------------criteriaBuilder ---------------------
//  https://www.baeldung.com/hibernate-criteria-queries#:~:text=The%20Criteria%20API%20allows%20us,on%20the%20JPA%20Criteria%20API.
//  https://dev.to/bowlendev/conditional-criteriabuilder-for-optional-params-2j6
    public List<UserDatingProfile> findAllMatchingTheCriteria(UserDatingProfile currentUserDatingProfile) {
//  https://www.baeldung.com/jpa-and-or-criteria-predicates
        EntityManager em = entityManagerFactory.createEntityManager();
        try {
            CriteriaBuilder cb = em.getCriteriaBuilder();

            CriteriaQuery<UserDatingProfile> cq = cb.createQuery(UserDatingProfile.class);
            Root<UserDatingProfile> userDatingProfileRoot = cq.from(UserDatingProfile.class);
            Predicate minAgeCriteria = cb.greaterThanOrEqualTo(userDatingProfileRoot.get("age"), currentUserDatingProfile.getMinPreferedAge());
            Predicate maxAgeCriteria = cb.lessThanOrEqualTo(userDatingProfileRoot.get("age"), currentUserDatingProfile.getMaxPreferedAge());
//        Predicate lastVisitDateCriteria = cb.equal(userDatingProfile.get("????"), userDatingProfileSelector.get????????());
            Predicate sexCriteria = cb.equal(userDatingProfileRoot.get("mySex"), currentUserDatingProfile.getSeekAPersonOfSex());
            Predicate minHeightCriteria = cb.greaterThanOrEqualTo(userDatingProfileRoot.get("myHeight"), currentUserDatingProfile.getMinHeightIWant());
            Predicate maxHeightCriteria = cb.lessThanOrEqualTo(userDatingProfileRoot.get("myHeight"), currentUserDatingProfile.getMaxHeightIWant());
            Predicate citizenOfCountryCriteria = cb.equal(userDatingProfileRoot.get("myCitizenship"), currentUserDatingProfile.getWantFromCountry());
            Predicate liveInCountryCriteria = cb.equal(userDatingProfileRoot.get("countryINowLiveIn"), currentUserDatingProfile.getWantFromCountry());
            Predicate countrySelect = cb.or(citizenOfCountryCriteria, liveInCountryCriteria);
            Predicate childrenCriteria = cb.lessThanOrEqualTo(userDatingProfileRoot.get("numberOfMyChildren"), currentUserDatingProfile.getMaxNumberOfChildrenAllowed());

            List<Predicate> predicates = new ArrayList<>();

     /*       if (currentUserDatingProfile.getMinPreferedAge() > 0) {
                predicates.add(minAgeCriteria);
            }
            if (currentUserDatingProfile.getMaxPreferedAge() > 0) {
                predicates.add(maxAgeCriteria);
            }*/

            if (currentUserDatingProfile.getWantFromCountry() != null) {
                predicates.add(countrySelect);
            }

            if (!(currentUserDatingProfile.getSeekAPersonOfSex() == Sex.ANY
                    || currentUserDatingProfile.getSeekAPersonOfSex() == Sex.OTHER)) {
                predicates.add(sexCriteria);
            }

            if (currentUserDatingProfile.getMinHeightIWant() > 100) {
                predicates.add(minHeightCriteria);
                //            System.out.println("added Predicate: minHeightCriteria");
            }
            if (currentUserDatingProfile.getMaxHeightIWant() > 150) {
                predicates.add(maxHeightCriteria);
                //            System.out.println("added Predicate: maxHeightCriteria");
            }


            if (currentUserDatingProfile.getMaxNumberOfChildrenAllowed() < 100) {
                predicates.add(childrenCriteria);
                //            System.out.println("added Predicate: childrenCriteria");
            }
            cq.where(predicates.toArray(new Predicate[predicates.size()]));

            em.getTransaction().begin();
            List<UserDatingProfile> candidatesMatchingCriteria = em.createQuery(cq).getResultList();

//        System.out.println("candidatesMatchingCriteria: " + candidatesMatchingCriteria);
            em.getTransaction().commit();
            em.close();
            return candidatesMatchingCriteria;
        } catch (Exception e) {
            System.out.println("Exception in service.findAllMatchingTheCriteria(UserDatingProfile currentUserDatingProfile)");
            if (em != null) {
                em.close();
            }
            return null;
        }
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

}
