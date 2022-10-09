package com.hub.accommodation.repository;

import com.hub.accommodation.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl {

    private final EntityManagerFactory emf;

    public List<User> findAllByIds(List<Long> ids) {
        if (ids.isEmpty()) {
            return null;
        }
        EntityManager em = null;
        try {
            em = emf.createEntityManager();
//            em.getTransaction().begin();
            Query q = em.createQuery("from User u where u.id in :ids")
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

    public void setDatingParticipationFlag(Long userId, Boolean value){
        System.out.println("in setDatingParticipationTrue(Long "+userId+")");
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
