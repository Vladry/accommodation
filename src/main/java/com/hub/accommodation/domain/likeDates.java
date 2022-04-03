package com.hub.accommodation.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class likeDates extends BaseEntity{
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    @Temporal(TIMESTAMP)
//    private Date likeDate;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "accommod_main_id")
    private AccommodationMain accommod_main;
}
