package com.hub.accommodation.service;

import com.hub.accommodation.domain.user.Subscriptions;
import com.hub.accommodation.exception.NoDataFoundException;
import com.hub.accommodation.repository.SubscriptionDao;
import com.hub.accommodation.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;
    private final SubscriptionDao subscriptionDao;

    public Subscriptions getSubscriptions(Long userId) throws RuntimeException  {
        try {
            Optional<Subscriptions> sOpt = subscriptionRepository.findSubscriptionsByUserId(userId);
            return sOpt.orElseGet(() -> subscriptionDao.getDefaultSubscriptions(userId));
        } catch (Exception e) {
            throw new NoDataFoundException("subscriptions in SubscriptionService::getSubscriptions for userId", String.valueOf(userId) );
        }
    }


}