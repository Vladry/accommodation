package com.hub.accommodation.repository;

import com.hub.accommodation.domain.user.UserDatingProfile;
import com.hub.accommodation.domain.user.enums.Sex;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.Metamodel;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Log4j2
@Repository
public class UdpRepository2 {
    @PersistenceUnit
    EntityManagerFactory emf;


    /***FIND METHODS***/
    //-----------------criteriaBuilder ---------------------
//  https://www.baeldung.com/hibernate-criteria-queries#:~:text=The%20Criteria%20API%20allows%20us,on%20the%20JPA%20Criteria%20API.
//  https://dev.to/bowlendev/conditional-criteriabuilder-for-optional-params-2j6
    public List<UserDatingProfile> findAllMatchingTheCriteria(UserDatingProfile currentUserDatingProfile) {
//  https://www.baeldung.com/jpa-and-or-criteria-predicates
        EntityManager em = emf.createEntityManager();
        try {
            CriteriaBuilder cb = em.getCriteriaBuilder();
            CriteriaQuery<UserDatingProfile> cq = cb.createQuery(UserDatingProfile.class);
            Root<UserDatingProfile> root = cq.from(UserDatingProfile.class);
            Predicate ageCriteria = cb.between(root.<LocalDate>get("birthday"), LocalDate.now().minusYears(currentUserDatingProfile.getMaxPreferedAge()), LocalDate.now().minusYears(currentUserDatingProfile.getMinPreferedAge()));
            Predicate minAgeLimit = cb.lessThanOrEqualTo(root.<LocalDate>get("birthday"), LocalDate.now().minusYears(currentUserDatingProfile.getMinPreferedAge()));
            Predicate maxAgeLimit = cb.greaterThanOrEqualTo(root.<LocalDate>get("birthday"), LocalDate.now().minusYears(currentUserDatingProfile.getMaxPreferedAge()));

            //        Predicate lastVisitDateCriteria = cb.equal(userDatingProfile.get("????"), userDatingProfileSelector.get????????());
            Predicate sexCriteria = cb.equal(root.get("mySex"), currentUserDatingProfile.getSeekAPersonOfSex());
            Predicate minHeightCriteria = cb.greaterThanOrEqualTo(root.get("myHeight"), currentUserDatingProfile.getMinHeightIWant());
            Predicate maxHeightCriteria = cb.lessThanOrEqualTo(root.get("myHeight"), currentUserDatingProfile.getMaxHeightIWant());
            Predicate citizenOfCountryCriteria = cb.equal(root.get("myCitizenship"), currentUserDatingProfile.getWantFromCountry());
            Predicate liveInCountryCriteria = cb.equal(root.get("countryINowLiveIn"), currentUserDatingProfile.getWantFromCountry());
            Predicate countrySelect = cb.or(citizenOfCountryCriteria, liveInCountryCriteria);
            Predicate childrenCriteria = cb.lessThanOrEqualTo(root.get("numberOfMyChildren"), currentUserDatingProfile.getMaxNumberOfChildrenAllowed());

            List<Predicate> predicates = new ArrayList<>();


            if (currentUserDatingProfile.getMinPreferedAge() > 15
                    && currentUserDatingProfile.getMaxPreferedAge() > 16) {
                predicates.add(ageCriteria);
            }
            if (currentUserDatingProfile.getMinPreferedAge() > 15) {
                predicates.add(minAgeLimit);
            }
            if (currentUserDatingProfile.getMaxPreferedAge() > 16) {
                predicates.add(maxAgeLimit);
            }


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

    /***SAVE METHODS***/
    public UserDatingProfile saveCustomised(UserDatingProfile entity) {
//        System.out.println("in UdpRepository2.saveOnly(entity) ->");
//        System.out.println("entity.getUserId(): " + entity.getUserId());
        EntityManager em = emf.createEntityManager();
        UserDatingProfile e = null;
        try {
            Query q = em.createQuery("select udp from UserDatingProfile udp where udp.userId = :id")
                    .setParameter("id", entity.getUserId());
            e = (UserDatingProfile) q.getSingleResult();
        } catch (Exception ex) {
            log.info(ex.getMessage());
//            System.out.println("saveOnly(UserDatingProfile entity)-> exception in try-catch, e not found");
            if (em != null) {
                em.close();
            }
        }

//        System.out.println("got e from DB,  e: " + e);
        try {
            em.getTransaction().begin();
            if (!em.contains(e)) {
                em.persist(entity);
//                System.out.println("persisted new entity: " + entity);
                em.getTransaction().commit();
            } else if (em.contains(e)) {
                entity.setId(e.getId());
                em.detach(e);
                em.merge(entity);
//                System.out.println("merged existing entity: " + e);
                em.getTransaction().commit();
            }
        } catch (NullPointerException ex) {
            em.getTransaction().rollback();
            System.out.println(ex.getMessage());
            log.error("probably in: entity has empty id field, check: entity.setId(e.getId()");
        } catch (Exception ex) {
            em.getTransaction().rollback();
            log.warn(ex.getMessage());
            log.error("UserDatingProfile saveOnly(UserDatingProfile entity)-> error persisting entity");
        } finally {
            if (em != null) {
                em.close();
            }
        }
        return entity;
    }

    public void registerVisitToDating(Long id) {
//        System.out.println("in registerVisitToDating(Long "+id+")");
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            UserDatingProfile udp = em.find(UserDatingProfile.class, id);
            udp.setLastVisitDate(ZonedDateTime.now());
            em.getTransaction().commit();
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }


}


