package com.hub.accommodation.controller;

import com.hub.accommodation.domain.user.Subscriptions;
import com.hub.accommodation.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@Validated
@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/users")
public class SubscriptionsController {
    private final SubscriptionService subscriptionService;


    @GetMapping("/subscriptions/{id}")
    public Subscriptions findSubscriptions(@PathVariable("id") Long userId) {
        System.out.println("in Subscriptions findSubscriptions, userId: " + userId);
        Set<String> defaultSubscriptions = new HashSet<>(List.of(
                "/queue.dating.message.sent.notifications."+ userId, //личные сообщения друг другу (privateMessages)
                "/queue.dating.likes.notifications."+ userId, // уведомления о лайках
                "/topic.dating.announcements"
        ));

//        System.out.println("SubscriptionsController-> findSubscriptions, id:" + userId);
        Optional<Subscriptions> subscrOpt = subscriptionService.findSubscriptionsByUserId(userId);
        Subscriptions s = subscrOpt.orElse(new Subscriptions(userId, defaultSubscriptions));
        System.out.println("Subscriptions: " + s);
//        return s.getSubscriptions();
        return s;
    }

}
