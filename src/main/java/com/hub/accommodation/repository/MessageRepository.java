package com.hub.accommodation.repository;

import com.hub.accommodation.domain.Message;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface MessageRepository extends RepositoryInterface<Message> {

    @Query("SELECT DISTINCT m.fromId FROM Message m where m.chat = :chat AND m.toId = :toId")
    List<Long> getFromIdDistinctByChatAndToIdOrderByCreatedDate(@Param("chat")String chat, @Param("toId")Long toId);
    @Query("SELECT DISTINCT m.toId FROM Message m where m.chat = :chat AND m.fromId = :fromId")
    Set<Long> getToIdDistinctByChatAndFromIdOrderByCreatedDate(@Param("chat")String chat, @Param("fromId") Long fromId);//при вызове передается toId, a тут уже принимаю айдишник в fromId: так надо!)

    Set<Message> findBySeenAndFromIdAndToId(Boolean seen, Long fromId, Long toId);
    void deleteMessageById(Long id);
    List<Message> getMessageByToId(Long id);
    List<Message> getMessageByFromId(Long id);
    List<Message> getMessageByTypeAndToId(String type, Long id);
    List<Message> getMessageByTypeAndFromId(String type, Long id);
    List<Message> getMessageByChatAndFromId(String chat, Long id);
    List<Message> getUnseenMessageByChatAndSeenAndToId(String chat, Boolean seen, Long id);
    List<Message> getMessageByTypeAndFromIdAndToId(String type, Long fromId, Long toId);
    List<Message> getMessageByChatAndFromIdAndToId(String chat, Long fromId, Long toId);
    void deleteMessageByTypeAndFromIdAndToId(String type, Long fromId, Long toId);
    List<Message> findMessageByType(String type);

}
