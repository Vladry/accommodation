package com.hub.accommodation.domain;

import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@ToString(of = {"street", "numberOfRooms", "numberOfBeds", "canHelpWithWork", "canHelpWithFood"})
@Table(name = "accommodation")
public class Accommodation extends BaseEntity {

    @Column(name = "country", length = 20)
    String country;
    @Column(name = "street", length = 40)
    String street;
    @Column(name = "accomodation_type")
    @Enumerated(EnumType.ORDINAL)
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

    @Enumerated(EnumType.ORDINAL)
    AccommodationStatus status;
    @Column(name = "dating")
    boolean datingServiceParticipation;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    User user;
    @OneToMany(mappedBy = "accommodation", cascade = CascadeType.ALL)
    Set<likeDates> liked = new HashSet<>();

    public String getAccommodationType(){
        return accommodationType.name();
    }
}
