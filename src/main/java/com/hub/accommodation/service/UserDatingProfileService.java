package com.hub.accommodation.service;

import com.hub.accommodation.DTO.request.UserDatingProfileRqDto;
import com.hub.accommodation.DTO.response.UserDatingProfileRsDto;
import com.hub.accommodation.domain.user.UserDatingProfile;
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
    public UserDatingProfileRsDto saveById(UserDatingProfileRqDto udpRqDto) {
//        System.out.println("in service.saveById() -получили из формы: " + udpRqDto);
        UserDatingProfile userDatingProfile = userDatingProfileFacade.convertToEntity(udpRqDto);
//        EntityManager em = entityManagerFactory.createEntityManager();
//        em.getTransaction().begin();
        System.out.println("userDatingProfile: "+ userDatingProfile);
//        em.getTransaction().commit();
        return userDatingProfileFacade.convertToDto(userDatingProfile);
//         return null;
    }


    //------  ГОТОВЫЕ МЕТОДЫ -----------
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
    public List<UserDatingProfile> findAllById(Iterable<Long> listOfIds) {
        return null;
    }


    @Transactional(readOnly = true, timeout = 1000)
    public Optional<UserDatingProfile> findUserDatingProfileById(Long id) {
        return userDatingProfileRepository.findUserDatingProfileById(id);
    }

    //-----------------criteriaBuilder ---------------------
//  https://www.baeldung.com/hibernate-criteria-queries#:~:text=The%20Criteria%20API%20allows%20us,on%20the%20JPA%20Criteria%20API.
//  https://dev.to/bowlendev/conditional-criteriabuilder-for-optional-params-2j6
    @Transactional(readOnly = true, timeout = 1000)
    public List<UserDatingProfile> findAllMatchingTheCriteria(UserDatingProfile currentUserDatingProfile) {
        EntityManager em = entityManagerFactory.createEntityManager();
        em.getTransaction().begin();
        CriteriaBuilder cb = em.getCriteriaBuilder();

        CriteriaQuery<UserDatingProfile> cq = cb.createQuery(UserDatingProfile.class);
        Root<UserDatingProfile> userDatingProfile = cq.from(UserDatingProfile.class);
//        Predicate minAgeCriteria = cb.equal(userDatingProfile.get("birthday"), userDatingProfileSelector.getMinPreferedAge());
//        Predicate maxAgeCriteria = cb.equal(userDatingProfile.get("birthday"), userDatingProfileSelector.getMaxPreferedAge());
//        Predicate lastVisitDateCriteria = cb.equal(userDatingProfile.get("????"), userDatingProfileSelector.getMaxPreferedAge());
        Predicate sexCriteria = cb.equal(userDatingProfile.get("mySex"), currentUserDatingProfile.getSeekAPersonOfSex());
        Predicate minHeightCriteria = cb.greaterThanOrEqualTo(userDatingProfile.get("myHeight"), currentUserDatingProfile.getMinHeightIWant());
        Predicate maxHeightCriteria = cb.lessThanOrEqualTo(userDatingProfile.get("myHeight"), currentUserDatingProfile.getMaxHeightIWant());
        Predicate countryCriteria = cb.equal(userDatingProfile.get("countryINowLiveIn"), currentUserDatingProfile.getWantFromCountry());
        Predicate childrenCriteria = cb.lessThanOrEqualTo(userDatingProfile.get("numberOfMyChildren"), currentUserDatingProfile.getMaxNumberOfChildrenAllowed());

        List<Predicate> predicates = new ArrayList<>();
        predicates.add(sexCriteria);
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

        List<UserDatingProfile> candidatesMatchingCriteria = em.createQuery(cq).getResultList();

//        System.out.println("candidatesMatchingCriteria: " + candidatesMatchingCriteria);
        em.getTransaction().commit();
        em.close();
        return candidatesMatchingCriteria;

    }


}
