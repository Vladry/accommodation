package com.hub.accommodation.service;

import com.hub.accommodation.domain.user.Subscriptions;
import com.hub.accommodation.domain.user.UserDatingProfile;
import com.hub.accommodation.dto.response.UserDatingProfileRsDto;
import com.hub.accommodation.facade.UserDatingProfileFacade;
import com.hub.accommodation.repository.SubscriptionRepository;
import com.hub.accommodation.repository.UdpRepository2;
import com.hub.accommodation.repository.UserDatingProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;

    public Optional<Subscriptions> findSubscriptionsByUserId(Long userId) {
        return subscriptionRepository.findSubscriptionsByUserId(userId);
    }


}