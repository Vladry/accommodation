package com.hub.accommodation.repository;

import com.hub.accommodation.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
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
            if (em != null) {
                em.close();
            }
            System.out.println("Exception in UserRepositoryImpl.findAllByIds(ids)");
            return new ArrayList<>();
        }
    }
}
