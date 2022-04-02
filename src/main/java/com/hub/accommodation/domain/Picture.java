package com.hub.accommodation.domain;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Table(name = "pictures")
public class Picture extends BaseEntity {

    private String picture;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "accommodation_details_id")
    private AccommodationDetails accommodationDetails;
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "tenant_id")
//    private Tenant tenant;
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "dating_member_id")
//    private Tenant datingMember;
}
