package com.hub.accommodation.domain.accommodation;

import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.accommodation.enums.AccommodationStatus;
import com.hub.accommodation.domain.accommodation.enums.AccommodationType;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"pictures", "liked"})
@Table(name = "accommodations")
//@AttributeOverride(name="id", column=@Column(name="user_id"))  // https://www.baeldung.com/jpa-attributeoverride
public class Accommodation extends BaseEntity  {

    @Column(name="user_id")
    Long userId;
    @Column(name = "locations", length = 50)
    String location;
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "acc_type")
    AccommodationType accommodationType;
    @Column(name = "num_of_rooms", nullable = true)
    Integer numberOfRooms;
    @Column(name = "num_of_beds", nullable = true)
    Integer numberOfBeds;
    @Column(name = "price_total", nullable = true)
    Integer priceTotal;
    @Column(name = "price_per_room", nullable = true)
    Integer pricePerRoom;
    @Column(name = "price_per_person", nullable = true)
    Integer pricePerPerson;
    @Column(name = "provide_work")
    Boolean helpFindWork;
    @Column(name = "provide_food")
    Boolean helpWithFood;

    @OneToMany(mappedBy = "accommodationDetails", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<Picture> pictures = new HashSet<>();

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "status")
    AccommodationStatus status;


    @Column(name = "disab_sprt")
    Boolean disabilityOrElderlySupport;
    @Column(name = "childcare_sprt")
    Boolean childCareSupport;
    @Column(name = "pets")
    Boolean petsAllowed;
    @OneToMany(mappedBy = "accommodation", cascade = CascadeType.ALL)
    Set<LikeDate> liked = new HashSet<>();


    public String getAccommodationType() {
        return accommodationType.name();
    }
}
