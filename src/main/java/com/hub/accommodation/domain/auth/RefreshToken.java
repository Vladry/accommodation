package com.hub.accommodation.domain.auth;

import com.hub.accommodation.domain.BaseEntity;
import com.hub.accommodation.domain.user.UserDB;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;


@Entity
@Table(name = "refresh_tokens")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@DynamicUpdate
public class RefreshToken extends BaseEntity {
    @Column(name = "expiration_date")
    private Date expirationDate;
    @Column(name = "issue_date")
    private Date issueDate;
    @Column(name = "is_used")
    private Boolean isUsed;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserDB user;

    public RefreshToken(Long refreshTokenExpiration, UserDB user) {
        Instant now = Instant.now();
        this.issueDate = Date.from(now);
        this.expirationDate = Date.from(now.plus(refreshTokenExpiration, ChronoUnit.DAYS) );
        this.isUsed = false;
        this.user = user;
    }
}