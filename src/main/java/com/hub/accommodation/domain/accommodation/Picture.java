package com.hub.accommodation.domain.accommodation;

import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.user.UserDatingProfile;
import com.hub.accommodation.domain.Tenant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Table(name = "user_pictures")
public class Picture extends BaseEntity {

    private String picture;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "accommodation_details_id")
    private Accommodation accommodationDetails;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id")
    private Tenant tenant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dating_user_profile")
    private UserDatingProfile userDatingProfile;
}
