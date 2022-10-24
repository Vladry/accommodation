package com.hub.accommodation.domain;

import com.hub.accommodation.domain.user.enums.ServiceGroup;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;


@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="photos")
@ToString
public class Photo extends BaseEntity {

    @GeneratedValue(strategy = GenerationType.SEQUENCE) //изменить генератор, чтобы не отключить batching,см. раздел 7:  https://www.baeldung.com/jpa-hibernate-batch-insert-update
    private Long id;

    @Column(name="user_id")
    private Long userId;

   @Enumerated(EnumType.STRING)
    @Column(name="service_group")
    private ServiceGroup serviceGroup;

    @Column(name="url")
    private String url;


}
