package com.hub.accommodation.domain;
0
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Picture <? extends Object> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    private String picture;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "picture_id")
    private T bearer;
}
