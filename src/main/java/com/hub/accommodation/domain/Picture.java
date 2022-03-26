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
    @JoinColumn(name = "picture_id")
    private Owner owner;
}
