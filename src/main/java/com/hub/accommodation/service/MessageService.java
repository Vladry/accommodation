package com.hub.accommodation.service;

import com.hub.accommodation.domain.Message;
import com.hub.accommodation.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MessageService {
    private final MessageRepository messageRepository;

    public void saveMessage(Message message){
        messageRepository.save(message);
    }

    public void deleteMessage(Message message){
        messageRepository.delete(message);
    }
    public void deleteMessageById(Long id){
        messageRepository.deleteMessageById(id);
    }
    @Transactional(readOnly = true)
    public List<Message>  getMessageByToId(Long id){
        return  messageRepository.getMessageByToId(id);
    }
    @Transactional(readOnly = true)
    public List<Message>  getMessageByFromId(Long id){
        return  messageRepository.getMessageByFromId(id);
    }
    @Transactional(readOnly = true)
    public List<Message>  getMessageByTypeAndToId(String type, Long id){
        return  messageRepository.getMessageByTypeAndToId(type, id);
    }
    @Transactional(readOnly = true)
    public List<Message>  getNotificationByTypeAndFromId(String type, Long id){
        System.out.println("in service.getMessageByTypeAndFromId");
        System.out.println("type: "+ type+ ", id: "+ id);
        return messageRepository.getMessageByTypeAndFromId(type, id);
    }
    @Transactional(readOnly = true)
    public List<Message>  getMessageByChatAndFromId(String chat, Long id){
        System.out.println("in service.getMessageByTypeAndFromId");
        System.out.println("type: "+ chat+ ", id: "+ id);
        return messageRepository.getMessageByChatAndFromId(chat, id);
    }


    @Transactional(readOnly = true)
    public List<Message>  getMessageByTypeAndFromIdAndToId(String type, Long fromId, Long toId){
        System.out.println("in service.getMessageByTypeAndFromIdAndToId");
        System.out.println("type: "+ type+ ",  fromId: " + fromId + ", toId: " + toId);
        return messageRepository.getMessageByTypeAndFromIdAndToId(type, fromId, toId);
    }


    @Transactional(readOnly = true)
    public List<Message>  getMessageByChatAndFromIdAndToId(String chat, Long fromId, Long toId){
        System.out.println("in service.getMessageByChatAndFromIdAndToId");
        System.out.println("chat: "+ chat+ ",  fromId: " + fromId + ", toId: " + toId);
        return messageRepository.getMessageByChatAndFromIdAndToId(chat, fromId, toId);
    }


    public void  deleteMessageByTypeAndFromIdAndToId(String type, Long fromId, Long toId){
        System.out.println("in service.deleteMessageByTypeAndFromIdAndToId");
        System.out.println("type: "+ type+ ",  fromId: " + fromId + ", toId: " + toId);
         messageRepository.deleteMessageByTypeAndFromIdAndToId(type, fromId, toId);
    }




    @Transactional(readOnly = true)
    public List<Message> getMessageByType(String type){
        System.out.println("in service.getMessageByType");
        System.out.println("type: "+ type);
        return messageRepository.findMessageByType(type);
    }


    @Transactional(readOnly = true)
    public List<Message> getAllMessages(){
        System.out.println("in service.getAllMessages");
        return messageRepository.findAll();
    }
}
