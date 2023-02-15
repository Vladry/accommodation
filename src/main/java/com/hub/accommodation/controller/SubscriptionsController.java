package com.hub.accommodation.controller;

import com.hub.accommodation.domain.user.Subscriptions;
import com.hub.accommodation.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("${api.ver}/users")
public class SubscriptionsController {
    private final SubscriptionService subscriptionService;


    @GetMapping("/subscriptions/{id}")
    public ResponseEntity<?> getSubscriptions(@PathVariable("id") Long userId) {
        return ResponseEntity.ok(subscriptionService.getSubscriptions(userId));
    }

}
