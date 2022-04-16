package com.hub.accommodation.domain.accommodation;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.accommodation.Accommodation;
import com.hub.accommodation.domain.user.Tenant;
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
    private Accommodation accommodationDetails;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id")
    private Tenant tenant;
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "dating_member_id")
//    private Tenant datingMember;
}
