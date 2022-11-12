package com.hub.accommodation.repository;

import com.hub.accommodation.domain.StompMessage;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MessageRepository extends RepositoryInterface<StompMessage> {

    void deleteMessageById(Long id);
    Optional<StompMessage> getMessageByToId(Long id);
    Optional<StompMessage> getMessageByFromId(Long id);
    Optional<StompMessage> getMessageByTypeAndToId(String type, Long id);
    Optional<StompMessage> getMessageByTypeAndFromId(String type, Long id);

}
