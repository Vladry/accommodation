package com.hub.accommodation.domain;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@ToString(of = {"picture", "owner", "tenant", "datingMember"})
@Table(name = "picture")
public class Picture extends AbstractEntity {

    private String picture;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private Owner owner;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id")
    private Tenant tenant;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dating_member_id")
    private Tenant datingMember;
}
