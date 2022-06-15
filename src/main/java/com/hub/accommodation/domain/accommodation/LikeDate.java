package com.hub.accommodation.domain.accommodation;

import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.accommodation.Accommodation;
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
public class LikeDate extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "accommodation_id")
    private Accommodation accommodation;//FIXME: подумать как организовать "устаревание" залайканных вариантов жилья
}
