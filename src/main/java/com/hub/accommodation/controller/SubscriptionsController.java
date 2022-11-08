package com.hub.accommodation.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.hub.accommodation.config.Views;
import com.hub.accommodation.domain.user.Subscriptions;
import com.hub.accommodation.domain.user.UserDatingProfile;
import com.hub.accommodation.dto.request.UserDatingProfileRqDto;
import com.hub.accommodation.dto.response.UserDatingProfileRsDto;
import com.hub.accommodation.exception.NoDataFoundException;
import com.hub.accommodation.facade.UserDatingProfileFacade;
import com.hub.accommodation.service.SubscriptionService;
import com.hub.accommodation.service.UserDatingProfileService;
import com.hub.accommodation.service.UserService;
import com.hub.accommodation.util.JsonToDtoConverter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;


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
//    public Set<String> findSubscriptions(@PathVariable("id") Long userId) {

        Set<String> defaultSubscriptions = new HashSet<>(List.of(
                "/queue/dating/" + userId,
                "/topic/dating.announcements"
        ));

        System.out.println("SubscriptionsController-> findSubscriptions, id:" + userId);
        Optional<Subscriptions> subscrOpt = subscriptionService.findSubscriptionsByUserId(userId);
        Subscriptions s = subscrOpt.orElse(new Subscriptions(userId, defaultSubscriptions));
        System.out.println("Subscriptions: " + s);
//        return s.getSubscriptions();
        return s;
    }

}
