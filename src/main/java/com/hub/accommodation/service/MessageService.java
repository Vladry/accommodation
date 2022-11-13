package com.hub.accommodation.service;

import com.hub.accommodation.domain.StompMessage;
import com.hub.accommodation.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

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
    public List<StompMessage>  getMessageByToId(Long id){
        return  messageRepository.getStompMessageByToId(id);
    }
    @Transactional(readOnly = true)
    public List<StompMessage>  getMessageByFromId(Long id){
        return  messageRepository.getStompMessageByFromId(id);
    }
    @Transactional(readOnly = true)
    public List<StompMessage>  getMessageByTypeAndToId(String type, Long id){
        return  messageRepository.getStompMessageByTypeAndToId(type, id);
    }
    @Transactional(readOnly = true)
    public List<StompMessage>  getMessageByTypeAndFromId(String type, Long id){
        System.out.println("in service.getMessageByTypeAndFromId");
        System.out.println("type: "+ type+ ", id: "+ id);
        return messageRepository.getStompMessageByTypeAndFromId(type, id);
    }


    @Transactional(readOnly = true)
    public List<StompMessage>  getMessageByTypeAndFromIdAndToId(String type, Long fromId, Long toId){
        System.out.println("in service.getMessageByTypeAndFromIdAndToId");
        System.out.println("type: "+ type+ ",  fromId: " + fromId + ", toId: " + toId);
        return messageRepository.getMessageByTypeAndFromIdAndToId(type, fromId, toId);
    }


    public void  deleteMessageByTypeAndFromIdAndToId(String type, Long fromId, Long toId){
        System.out.println("in service.deleteMessageByTypeAndFromIdAndToId");
        System.out.println("type: "+ type+ ",  fromId: " + fromId + ", toId: " + toId);
         messageRepository.deleteMessageByTypeAndFromIdAndToId(type, fromId, toId);
    }




    @Transactional(readOnly = true)
    public List<StompMessage> getMessageByType(String type){
        System.out.println("in service.getMessageByType");
        System.out.println("type: "+ type);
        return messageRepository.findStompMessageByType(type);
    }


    @Transactional(readOnly = true)
    public List<StompMessage> getAllMessages(){
        System.out.println("in service.getAllMessages");
        return messageRepository.findAll();
    }
}
