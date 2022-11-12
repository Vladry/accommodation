package com.hub.accommodation.service;

import com.hub.accommodation.domain.StompMessage;
import com.hub.accommodation.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MessageService {
    private final MessageRepository messageRepository;

    public void saveMessage(StompMessage message){
        messageRepository.save(message);
    }

    public void deleteMessage(StompMessage message){
        messageRepository.delete(message);
    }
    public void deleteMessageById(Long id){
        messageRepository.deleteMessageById(id);
    }
    @Transactional(readOnly = true)
    public Optional<StompMessage> getMessageByToId(Long id){
        return  messageRepository.getMessageByToId(id);
    }
    @Transactional(readOnly = true)
    public Optional<StompMessage> getMessageByFromId(Long id){
        return  messageRepository.getMessageByFromId(id);
    }
    @Transactional(readOnly = true)
    public Optional<StompMessage> getMessageByTypeAndToId(String type, Long id){
        return  messageRepository.getMessageByTypeAndToId(type, id);
    }
    @Transactional(readOnly = true)
    public Optional<StompMessage> getMessageByTypeAndFromId(String type, Long id){
        return  messageRepository.getMessageByTypeAndFromId(type, id);
    }
}
