package com.hub.accommodation.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import com.hub.accommodation.Views;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import javax.annotation.PostConstruct;
import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import static javax.persistence.TemporalType.TIMESTAMP;

@Data
@NoArgsConstructor
@ToString(of = {"id"})
@EqualsAndHashCode(of = {"id"})
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
abstract public class BaseEntity {

    @Id
    @Column(name = "id", updatable = false, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView({Views.Public.class, Views.Internal.class})
    protected Long id;

    // Вариант локальных дат без корректировок зональности:
    @CreatedDate
    @DateTimeFormat(pattern = "dd.MM.YYYY kk:mm:ss")
    //https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/format/annotation/DateTimeFormat.html
    @JsonFormat(shape = JsonFormat.Shape.STRING,
            pattern = "dd.MM.yyyy kk:mm:ss")
    protected LocalDateTime createdDate_inLocalTimeZone;

    @LastModifiedDate
    @DateTimeFormat(pattern = "dd.MM.YYYY kk:mm:ss")
    @JsonFormat(shape = JsonFormat.Shape.STRING,
            pattern = "dd.MM.yyyy kk:mm:ss")
    protected LocalDateTime lastModifiedDate_inLocalTimeZone;

    // Вариант локальных дат с приведением к зональности UTC:
    @PrePersist
    public void onCreate() {
        this.createdDate_UTC = LocalDateTime.now(ZoneId.of("UTC"));
        this.lastModifiedDate_UTC = LocalDateTime.now(ZoneId.of("UTC"));
    }

    @PreUpdate
    public void onUpdate() {
        this.lastModifiedDate_UTC = LocalDateTime.now(ZoneId.of("UTC"));
    }

    @DateTimeFormat(pattern = "dd.MM.YYYY kk:mm:ss")  //https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/format/annotation/DateTimeFormat.html
    @JsonFormat(shape = JsonFormat.Shape.STRING,
            pattern = "dd.MM.yyyy kk:mm:ss")
    protected LocalDateTime createdDate_UTC;

    @DateTimeFormat(pattern = "dd.MM.YYYY kk:mm:ss")
    @JsonFormat(shape = JsonFormat.Shape.STRING,
            pattern = "dd.MM.yyyy kk:mm:ss")
    protected LocalDateTime lastModifiedDate_UTC;


    @CreatedDate
    protected Instant createdDate;
    @LastModifiedDate
    protected Instant lastModifiedDate;
}
