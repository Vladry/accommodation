package com.hub.accommodation.domain;

import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Entity;
import java.util.Objects;

@Entity
@Getter
@Setter
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Message extends BaseEntity {

    private String destination;
    private String type; //по этому полю ведем выборку WS уведомлений
    private String chat; //по этому полю определяем, к какому чату относится сообщение (к примеру к dating или volunteer или accommodation )
    private String value;
    private String subject;
    private Boolean seen = false;
    private Long fromId;
    private Long toId;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Message that = (Message) o;
        return id != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Math.toIntExact(this.id); //TODO переписать правильно! Возможно взять хэш от значений полей, а не от Long айдишника
    }
}
