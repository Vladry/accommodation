package com.hub.accommodation.repository;

import com.hub.accommodation.domain.StompMessage;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface MessageRepository extends RepositoryInterface<StompMessage> {

    void deleteMessageById(Long id);
    List<StompMessage> getStompMessageByToId(Long id);
    List<StompMessage> getStompMessageByFromId(Long id);
    List<StompMessage> getStompMessageByTypeAndToId(String type, Long id);
    List<StompMessage> getStompMessageByTypeAndFromId(String type, Long id);
    List<StompMessage> getMessageByTypeAndFromIdAndToId(String type, Long fromId, Long toId);
    void deleteMessageByTypeAndFromIdAndToId(String type, Long fromId, Long toId);
    List<StompMessage> findStompMessageByType(String type);

}
