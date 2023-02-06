package com.hub.accommodation.domain;

import com.fasterxml.jackson.annotation.JsonView;
import com.hub.accommodation.config.Views;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.Instant;
import java.time.ZonedDateTime;


@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
abstract public class BaseEntity {

    @Id  // для hibernate аннотируем javax.persistence, а для spring.jdbc -аннотацией org.springframework.data.annotation.Id
    @Column(name = "id", updatable = false, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @JsonView({Views.Public.class, Views.SeenToAll.class})
    protected Long id;

    @LastModifiedDate
    protected Instant lastModifiedDate;

    @CreatedDate
    @Column(name = "created_date")
//    @Convert(converter = ZonedDateTimeConverter.class)
    protected ZonedDateTime createdDate;



    // Вариант локальных дат без корректировок зональности:
/*    @CreatedDate
    @DateTimeFormat(pattern = "dd.MM.YYYY kk:mm:ss")
    //https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/format/annotation/DateTimeFormat.html
    @JsonFormat(shape = JsonFormat.Shape.STRING,
            pattern = "dd.MM.yyyy kk:mm:ss")
    protected LocalDateTime createdDate_inLocalTimeZone;

    @LastModifiedDate
    @DateTimeFormat(pattern = "dd.MM.YYYY kk:mm:ss")
    @JsonFormat(shape = JsonFormat.Shape.STRING,
            pattern = "dd.MM.yyyy kk:mm:ss")
    protected LocalDateTime lastModifiedDate_inLocalTimeZone;*/

    // Вариант локальных дат с приведением к зональности UTC:
/*
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
*/



}
