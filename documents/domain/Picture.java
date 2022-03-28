package com.hub.accommodation.domain;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Picture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    private String picture;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private Owner owner;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id")
    private Tenant tenant;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dating-member_id")
    private Tenant datingMember;
}
