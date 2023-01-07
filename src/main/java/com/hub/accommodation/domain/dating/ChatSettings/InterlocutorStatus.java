package com.hub.accommodation.domain.dating.ChatSettings;

import com.hub.accommodation.domain.dating.DatingChatSettings;
import lombok.Data;
import lombok.experimental.Accessors;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

//смысл этой сушности: в ней фиксируется назначаемый в interlocutorContextMenu статус блокировок (из доступных в InterlocutorStatusEnum) собеседника в конкретном чате
// (dating, accommodation, volunteer) конкретного пользователя (userId). На основании статуса datingChatStatus в
// datingChats.reducer будет формироваться соответствующий список чатов receivedMessages
@Entity
@Data
@Accessors(chain = true, fluent = false)
@DynamicUpdate
@Table(name="interlocutor_status")
public class InterlocutorStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private Long interlocutorId;
    @Enumerated(EnumType.STRING)
    private InterlocutorStatusEnum datingChatStatus;
    @Enumerated(EnumType.STRING)
    private InterlocutorStatusEnum accommodationChatStatus;
    @Enumerated(EnumType.STRING)
    private InterlocutorStatusEnum volunteerChatStatus;
}
