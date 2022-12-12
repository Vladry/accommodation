package com.hub.accommodation.repository;

import com.hub.accommodation.domain.Message;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends RepositoryInterface<Message> {

    void deleteMessageById(Long id);
    List<Message> getMessageByToId(Long id);
    List<Message> getMessageByFromId(Long id);
    List<Message> getMessageByTypeAndToId(String type, Long id);
    List<Message> getMessageByTypeAndFromId(String type, Long id);
    List<Message> getMessageByChatAndFromId(String chat, Long id);
    List<Message> getMessageByTypeAndFromIdAndToId(String type, Long fromId, Long toId);
    List<Message> getMessageByChatAndFromIdAndToId(String chat, Long fromId, Long toId);
    void deleteMessageByTypeAndFromIdAndToId(String type, Long fromId, Long toId);
    List<Message> findMessageByType(String type);

}
