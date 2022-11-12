package com.hub.accommodation.domain;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.Entity;
import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class StompMessage extends BaseEntity {

    private String destination;
    private String type;
    private String value;
    private Long fromId;
    private Long toId;
    private String subject;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        StompMessage that = (StompMessage) o;
        return id != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Math.toIntExact(this.id); //TODO переписать правильно! Возможно взять хэш от значений полей, а не от Long айдишника
    }
}
