package com.hub.accommodation.domain;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Picture <T extends Object> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    private String picture;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bearer_id")
    private T bearer;
}
