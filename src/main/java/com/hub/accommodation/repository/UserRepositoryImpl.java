package com.hub.accommodation.repository;

import com.hub.accommodation.DTO.response.UserAgeRsDto;
import com.hub.accommodation.domain.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl {

    private final EntityManagerFactory emf;

    public List<UserAgeRsDto> getUsersAges(List<Long> ids) {
        EntityManager em = emf.createEntityManager();
        try {
            Query q = em.createQuery(
                    "select new com.hub.accommodation.DTO.response.UserAgeRsDto(" +
                            "udp.userId, udp.birthday) from UserDatingProfile udp where udp.userId in :ids");
            q.setParameter("ids", ids);
            List<UserAgeRsDto> userAgeRsDtoList = q.getResultList();
            userAgeRsDtoList.stream().peek(UserAgeRsDto::setAge).collect(Collectors.toList());
//        System.out.println("selected UserAgeRsDto(s) after age mapping: " + userAgeRsDtoList);
            return userAgeRsDtoList;
        } catch (RuntimeException e) {
            log.error(e.getMessage());
        } finally {
            em.close();
        }
        return new ArrayList<UserAgeRsDto>();
    }

    public void updateParamById(long id, String location) {

//        System.out.println("in UdpRepository2.updateParamById ->");
//        System.out.println("id: " + id);
//        System.out.println("location: " + location);

        EntityManager em = emf.createEntityManager();
        User e = null;
        try {
//            System.out.println("in 1st try-catch: trying to find existing user");
            Query q = em.createQuery("select u from User u where u.id = :id")
                    .setParameter("id", id);
            e = (User) q.getSingleResult();
//            System.out.println("successful end of 1st try-catch -> user found: " + e);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            System.out.println("updateParamById(long id, String param)-> exception in 1-st try-catch, u not found");
        }

        try {
//            System.out.println("in 2nd try-catch: trying to set user param");
            em.getTransaction().begin();
            if (em.contains(e)) {
                e.setLocation(location);
                em.detach(e);
                em.merge(e);
//                System.out.println("merged existing entity: " + e);
                em.getTransaction().commit();
            }
//            System.out.println("successful end of 2nd try-catch -> user.location persisted");
        } catch (NullPointerException ex) {
            em.getTransaction().rollback();
            System.out.println(ex.getMessage());
            System.out.println("NullPointerException in: updateParamById(long id, String location)");
        } catch (Exception ex) {
            em.getTransaction().rollback();
            System.out.println(ex.getMessage());
            System.out.println("other Exception in: updateParamById(long id, String location)");
        } finally {
            if (em != null) {
                em.close();
            }
        }


    }

    public List<User> findAllByIds(List<Long> ids) {
        if (ids.isEmpty()) {
            return null;
        }
        EntityManager em = null;
        try {
            em = emf.createEntityManager();
//            em.getTransaction().begin();
            Query q = em.createQuery("select u from User u where u.id in :ids")
                    .setParameter("ids", ids);

            List<User> users = q.getResultList();
//            em.getTransaction().commit();
            em.close();
            return users;

        } catch (Exception e) {

            System.out.println("Exception in UserRepositoryImpl.findAllByIds(ids)");
            return new ArrayList<>();
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public void registerVisitToDating(Long id) {
//        System.out.println("in registerVisitToDating(Long "+id+")");
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            User u = em.find(User.class, id);
            u.setDatingLastVisitDate(ZonedDateTime.now());
            em.getTransaction().commit();
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public void setDatingParticipationFlag(Long userId, Boolean value) {
//        System.out.println("in setDatingParticipationTrue(Long " + userId + ")");
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            User u = em.find(User.class, userId);
            u.setDatingServiceParticipation(value);
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
