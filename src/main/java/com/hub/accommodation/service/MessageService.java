package com.hub.accommodation.service;

import com.hub.accommodation.domain.dating.Interlocutor;
import com.hub.accommodation.domain.Message;
import com.hub.accommodation.domain.user.User;
import com.hub.accommodation.repository.MessageRepository;
import com.hub.accommodation.repository.UserRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MessageService {
    private final MessageRepository messageRepository;

    private Optional<Message> getMessage(Long id) {
        return messageRepository.findById(id);
    }


    public void saveMessage(Message message) {
        messageRepository.save(message);
    }

    public void setSeenTrue(Long fromId, Long toId) {
        Set<Message> msgs = messageRepository.findBySeenAndFromIdAndToId(false, fromId, toId);
        Set<Message> updated = msgs.stream().peek(
                m -> m.setSeen(true)
        ).collect(Collectors.toSet());
        messageRepository.saveAll(updated);
    }


    public void deleteMessage(Message message) {
        messageRepository.delete(message);
    }

    public void deleteMessageById(Long id) {
        messageRepository.deleteMessageById(id);
    }

    @Transactional(readOnly = true)
    public List<Message> getMessageByToId(Long id) {
        return messageRepository.getMessageByToId(id);
    }

    @Transactional(readOnly = true)
    public List<Message> getMessageByFromId(Long id) {
        return messageRepository.getMessageByFromId(id);
    }

    @Transactional(readOnly = true)
    public List<Message> getMessageByTypeAndToId(String type, Long id) {
        return messageRepository.getMessageByTypeAndToId(type, id);
    }

    @Transactional(readOnly = true)
    public List<Message> getNotificationByTypeAndFromId(String type, Long id) {
        return messageRepository.getMessageByTypeAndFromId(type, id);
    }

    @Transactional(readOnly = true)
    public List<Message> getMessageByChatAndFromId(String chat, Long id) {
        return messageRepository.getMessageByChatAndFromId(chat, id);
    }

    @Transactional(readOnly = true)
    public List<Message> getUnseenMessageByChatAndToId(String chat, Long id) {
        return messageRepository.getUnseenMessageByChatAndSeenAndToId(chat, false, id);
    }


    @Transactional(readOnly = true)
    public List<Message> getMessageByTypeAndFromIdAndToId(String type, Long fromId, Long toId) {
        return messageRepository.getMessageByTypeAndFromIdAndToId(type, fromId, toId);
    }


    @Transactional(readOnly = true)
    public List<Message> getMessageByChatAndFromIdAndToId(String chat, Long fromId, Long toId) {
        return messageRepository.getMessageByChatAndFromIdAndToId(chat, fromId, toId);
    }


    public void deleteAllCorrespondenceBetweenFromIdAndToId(String chat, Long fromId, Long toId) {
        messageRepository.deleteAllMessageByChatAndFromIdAndToId(chat, fromId, toId);
        messageRepository.deleteAllMessageByChatAndFromIdAndToId(chat, toId, fromId);
    }


    public void deleteMessageByTypeAndFromIdAndToId(String type, Long fromId, Long toId) {
        messageRepository.deleteMessageByTypeAndFromIdAndToId(type, fromId, toId);
    }


    @Transactional(readOnly = true)
    public List<Message> getMessageByType(String type) {
        System.out.println("in service.getMessageByType");
        return messageRepository.findMessageByType(type);
    }


    @Transactional(readOnly = true)
    public List<Message> getAllMessages() {
        System.out.println("in service.getAllMessages");
        return messageRepository.findAll();
    }
}
