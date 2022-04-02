package com.hub.accommodation.domain;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@ToString(of = {"street", "numberOfRooms", "numberOfBeds", "canHelpWithWork", "canHelpWithFood"})
@Table(name = "accommodation_details")
public class AccommodationDetails extends BaseEntity {
    String countryRegion;
    @Column(name = "country", length = 25, nullable = false)
    String street;
    @Column(name = "accomodation_type", length = 10)

    @Enumerated(EnumType.STRING)
    AccommodationType accommodationType;
    @Column(name = "number_of_rooms", nullable = true)
    int numberOfRooms;
    @Column(name = "number_of_beds", nullable = true)
    int numberOfBeds;
    @Column(name = "price_total", nullable = true)
    int priceTotal;
    @Column(name = "price_per_room", nullable = true)
    int pricePerRoom;
    @Column(name = "price_per_person", nullable = true)
    int pricePerPerson;
    boolean helpWithWork;
    boolean helpWithFood;

    @OneToMany(mappedBy = "accommodationDetails", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<Picture> pictures = new HashSet<>();

    @Enumerated(EnumType.STRING)
    AccommodationStatus status;
    @Column(name = "dating", nullable = true)
    boolean datingServiceParticipation;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "app_user_id")
    AppUser appUser;
    @OneToMany(mappedBy = "acc_details", cascade = CascadeType.ALL)
    Set<likeDates> liked = new HashSet<>();

}
