package com.hub.accommodation.service;

import com.hub.accommodation.domain.Message;
import com.hub.accommodation.exception.NoDataFoundException;
import com.hub.accommodation.repository.MessageRepository;
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
//        System.out.println("in service.setSeenTrue");
//        System.out.println("fromId: " + fromId + ",  toId: " + toId);
        Set<Message> msgs = messageRepository.findBySeenAndFromIdAndToId(false, fromId, toId);
        Set<Message> updated = msgs.stream().peek(
                m -> m.setSeen(true)
        ).collect(Collectors.toSet());
        messageRepository.saveAll(updated);
    }

    //тот же самый метод, что и выше, но только шлем кучу запросов:
/*    public void setSeenTrue(Long fromId, Long toId) {
        System.out.println("in service.setSeenTrue");
        System.out.println("fromId: " + fromId + ",  toId: " + toId);
        Set<Message> msgs = messageRepository.findBySeenAndFromIdAndToId(false, fromId, toId);
        //TODO для оптимизации -возможно можно собрать в коллекцию и заперсистить коллекцией?
        msgs.forEach(
                m -> {
                    System.out.println("message before: " + m);
                    m.setSeen(true);
                    System.out.println("message after: " + m);
                    messageRepository.save(m);
                }
        );
    }*/

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
        System.out.println("in service.getMessageByTypeAndFromId");
        System.out.println("type: " + type + ", id: " + id);
        return messageRepository.getMessageByTypeAndFromId(type, id);
    }

    @Transactional(readOnly = true)
    public List<Message> getMessageByChatAndFromId(String chat, Long id) {
        System.out.println("in service.getMessageByTypeAndFromId");
        System.out.println("type: " + chat + ", id: " + id);
        return messageRepository.getMessageByChatAndFromId(chat, id);
    }

    @Transactional(readOnly = true)
    public List<Message> getUnseenMessageByChatAndToId(String chat, Long id) {
//        System.out.println("in service.getUnseenMessageByChatAndToId");
        System.out.println("type: " + chat + ", id: " + id);
        return messageRepository.getUnseenMessageByChatAndSeenAndToId(chat, false, id);
    }


    @Transactional(readOnly = true)
    public List<Message> getMessageByTypeAndFromIdAndToId(String type, Long fromId, Long toId) {
        System.out.println("in service.getMessageByTypeAndFromIdAndToId");
        System.out.println("type: " + type + ",  fromId: " + fromId + ", toId: " + toId);
        return messageRepository.getMessageByTypeAndFromIdAndToId(type, fromId, toId);
    }


    @Transactional(readOnly = true)
    public List<Message> getMessageByChatAndFromIdAndToId(String chat, Long fromId, Long toId) {
//        System.out.println("in service.getMessageByChatAndFromIdAndToId");
        System.out.println("chat: " + chat + ",  fromId: " + fromId + ", toId: " + toId);
        return messageRepository.getMessageByChatAndFromIdAndToId(chat, fromId, toId);
    }


    public void deleteMessageByTypeAndFromIdAndToId(String type, Long fromId, Long toId) {
        System.out.println("in service.deleteMessageByTypeAndFromIdAndToId");
        System.out.println("type: " + type + ",  fromId: " + fromId + ", toId: " + toId);
        messageRepository.deleteMessageByTypeAndFromIdAndToId(type, fromId, toId);
    }


    @Transactional(readOnly = true)
    public List<Message> getMessageByType(String type) {
        System.out.println("in service.getMessageByType");
        System.out.println("type: " + type);
        return messageRepository.findMessageByType(type);
    }


    @Transactional(readOnly = true)
    public List<Message> getAllMessages() {
        System.out.println("in service.getAllMessages");
        return messageRepository.findAll();
    }
}
