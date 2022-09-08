package com.hub.accommodation.repository;

import com.hub.accommodation.domain.user.UserDatingProfile;
import com.hub.accommodation.domain.user.enums.Sex;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public class userDatingProfileSpecification {
/*
    EntityManager em = entityManagerFactory.createEntityManager();
    CriteriaBuilder cb = em.getCriteriaBuilder();
    CriteriaQuery<UserDatingProfile> cq = cb.createQuery(UserDatingProfile.class);
    Root<UserDatingProfile> userDatingProfileRoot = cq.from(UserDatingProfile.class);
*/

    public static Specification<UserDatingProfile> sexCriteria(final UserDatingProfile currentUserDatingProfile) {
        return (r, cq, cb) -> cb.equal(r.get("mySex"), currentUserDatingProfile.getSeekAPersonOfSex());
    }

    public static Specification<UserDatingProfile> minHeightCriteria(final UserDatingProfile currentUserDatingProfile) {
        return (r, cq, cb) -> cb.greaterThanOrEqualTo(r.get("myHeight"), currentUserDatingProfile.getMinHeightIWant());
    }

    public static Specification<UserDatingProfile> maxHeightCriteria(final UserDatingProfile currentUserDatingProfile) {
        return (r, cq, cb) -> cb.lessThanOrEqualTo(r.get("myHeight"), currentUserDatingProfile.getMaxHeightIWant());
    }

    public static Specification<UserDatingProfile> citizenOfCountryCriteria(final UserDatingProfile currentUserDatingProfile) {
        return (r, cq, cb) -> cb.equal(r.get("myCitizenship"), currentUserDatingProfile.getWantFromCountry());
    }
    public static Specification<UserDatingProfile> liveInCountryCriteria(final UserDatingProfile currentUserDatingProfile) {
        return (r, cq, cb) -> cb.equal(r.get("countryINowLiveIn"), currentUserDatingProfile.getWantFromCountry());
    }
//    (citizenOfCountryCriteria or liveInCountryCriteria);


    public static Specification<UserDatingProfile> childrenCriteria(final UserDatingProfile currentUserDatingProfile) {
        return (r, cq, cb) -> cb.lessThanOrEqualTo(r.get("numberOfMyChildren"), currentUserDatingProfile.getMaxNumberOfChildrenAllowed());
    }

    public static Specification<UserDatingProfile> minAgeCriteria(final UserDatingProfile currentUserDatingProfile) {
        return (r, cq, cb) -> cb.greaterThanOrEqualTo(r.get("age"), currentUserDatingProfile.getMinPreferedAge());
    }

    public static Specification<UserDatingProfile> maxAgeCriteria(final UserDatingProfile currentUserDatingProfile) {
        return (r, cq, cb) -> cb.lessThanOrEqualTo(r.get("age"), currentUserDatingProfile.getMaxPreferedAge());
    }

    public static Specification<UserDatingProfile> lastVisitDateCriteria(final UserDatingProfile currentUserDatingProfile) {
        return (r, cq, cb) -> cb.equal(r.get("lastVisitDate"), currentUserDatingProfile.getLastVisitDate());
    }
}



    /*
            List<Predicate> predicates = new ArrayList<>();

//           if (currentUserDatingProfile.getMinPreferedAge() > 0) {
//                predicates.add(minAgeCriteria);
//            }
//            if (currentUserDatingProfile.getMaxPreferedAge() > 0) {
//                predicates.add(maxAgeCriteria);
//            }

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


            List<UserDatingProfile> candidatesMatchingCriteria = em.createQuery(cq).getResultList();

            return candidatesMatchingCriteria;


        }*/

