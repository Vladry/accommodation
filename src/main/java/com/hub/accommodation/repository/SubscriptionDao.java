package com.hub.accommodation.repository;

import com.hub.accommodation.domain.user.Subscriptions;
import org.springframework.stereotype.Repository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Repository
public class SubscriptionDao {

    public Subscriptions getDefaultSubscriptions(Long userId){
        Set<String> defaultDestinations = new HashSet<>(List.of(
                "/queue.dating.message.sent.notifications."+ userId, //личные сообщения друг другу (privateMessages)
                "/queue.dating.likes.notifications."+ userId, // уведомления о лайках
                "/topic.dating.announcements"
        ));
        return new Subscriptions(userId, defaultDestinations);
    }
}
