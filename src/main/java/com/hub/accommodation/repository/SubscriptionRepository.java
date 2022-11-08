package com.hub.accommodation.repository;

import com.hub.accommodation.domain.user.Subscriptions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscriptions, Long> {
    Optional<Subscriptions> findSubscriptionsByUserId(Long userId);
}
