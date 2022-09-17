package com.hub.accommodation.service;

import com.hub.accommodation.domain.Tenant;
import com.hub.accommodation.domain.accommodation.Accommodation;
import com.hub.accommodation.domain.user.UserDatingProfile;
import com.hub.accommodation.repository.TenantRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import javax.persistence.Query;
import java.util.Optional;

@Service
//@Transactional
public class TenantService  extends GeneralService<Tenant> {

    private final TenantRepository tenantRepository;
    @PersistenceUnit
    private final EntityManagerFactory emf;

    public TenantService(TenantRepository tenantRepository, EntityManagerFactory emf) {
        this.tenantRepository = tenantRepository;
        this.emf = emf;
    }

    public void saveTenant(Tenant tenant) {
        tenantRepository.save(tenant);
    }

    public Optional<Tenant> findTenantProfileById(Long userId) {
        System.out.println("in findTenantProfileById(Long userId:" + userId + ")");
//        EntityManager em = emf.createEntityManager();
//        try {
//            Query q = em.createQuery("select t from Tenant t where t.userId = :userId")
//                    .setParameter("userId", userId);
//
//
////            Query q = em.createQuery("");
//
//            Tenant te = (Tenant) q.getSingleResult();
//            Optional<Tenant> tOpt = Optional.ofNullable(te);
//            em.close();
        Optional<Tenant> tOpt = tenantRepository.findByUserId(userId);
//            System.out.println("returning from service.findTenantProfileById,  tOpt:"+ tOpt);
            return tOpt;
//
//        } catch (Exception e) {
//            System.out.println("error finding Tenant");
//            return Optional.empty(;
//        }
    }
}
