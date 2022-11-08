package com.hub.accommodation.domain.user;

import lombok.*;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
//@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@ToString
@Table(name="subscriptions")

public class Subscriptions {
    @Id
    @Column(name="user_id", updatable=false, nullable=false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @ElementCollection(fetch=FetchType.EAGER, targetClass = String.class)
    private Set<String> subscriptions;
//    private Collection<String> subscriptions;
}
