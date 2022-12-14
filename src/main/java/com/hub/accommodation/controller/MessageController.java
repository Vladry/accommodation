package com.hub.accommodation.controller;

import com.hub.accommodation.domain.Message;
import com.hub.accommodation.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*") //TODO это обязательно во всех контроллерах. Но, при деплое -поудалять!
@RequestMapping("/api/v1/messages")
public class MessageController {

    private final MessageService messageService;

    @PostMapping
    public void saveMessage(@RequestBody Message message) {
        messageService.saveMessage(message);
    }

    @PutMapping("/seen/{id}")
    public void setSeenTrue (@PathVariable("id") Long id){
        messageService.setSeenTrue(id);
    }

    @DeleteMapping
    public void deleteMessage(@RequestBody Message message) {
        messageService.deleteMessage(message);
    }

    @DeleteMapping("/{id}")
    public void deleteMessageById(@PathVariable("id") Long id) {
        messageService.deleteMessageById(id);
    }

    @GetMapping("/to/{id}")
    public List<Message> getMessageByToId(@PathVariable("id") Long id) {
        return messageService.getMessageByToId(id);
    }

    @GetMapping("/from/{id}")
    public List<Message> getMessageByFromId(@PathVariable("id") Long id) {
        return messageService.getMessageByFromId(id);
    }

    @GetMapping("/to")
    public List<Message> getMessageByTypeAndToId(@RequestParam("type") String type, @RequestParam("id") Long id) {
        return messageService.getMessageByTypeAndToId(type, id);
    }

    @GetMapping("/from")
    public List<Message> getNotificationByTypeAndFromId(@RequestParam("type") String type, @RequestParam("id") Long id) {
        return messageService.getNotificationByTypeAndFromId(type, id);
    }

    @GetMapping("/chat/from")
    public List<Message> getMessageByChatAndFromId(@RequestParam("chat") String chat, @RequestParam("id") Long id) {
        return messageService.getMessageByChatAndFromId(chat, id);
    }

    @GetMapping("/chat/unseen/to/{id}")
    public List<Message> getUnseenMessageByChatAndToId(@RequestParam("chat") String chat, @PathVariable("id") Long id) {
        return messageService.getUnseenMessageByChatAndToId(chat, id);
    }

    @GetMapping("/chat/from/to")
    public List<Message> getMessageByChatAndFromIdAndToId(@RequestParam("chat") String chat,
                                                          @RequestParam("fromId") Long fromId,
                                                          @RequestParam("toId") Long toId) {
        return messageService.getMessageByChatAndFromIdAndToId(chat, fromId, toId);
    }


    @GetMapping("/likesAndBookmarks")
    public List<Message> getMessageByTypeAndFromIdAndToId(@RequestParam("type") String type,
                                                          @RequestParam("fromId") Long fromId,
                                                          @RequestParam("toId") Long toId) {
        return messageService.getMessageByTypeAndFromIdAndToId(type, fromId, toId);
    }

    @DeleteMapping("/likesAndBookmarks")
    public void deleteMessageByTypeAndFromIdAndToId(@RequestParam("type") String type,
                                                               @RequestParam("fromId") Long fromId,
                                                               @RequestParam("toId") Long toId) {
         messageService.deleteMessageByTypeAndFromIdAndToId(type, fromId, toId);
    }


    @GetMapping("/fromType")
    public List<Message> getMessageByType(@RequestParam("type") String type) {
        return messageService.getMessageByType(type);
    }

    @GetMapping("/all")
    public List<Message> getAllMessages() {
        return messageService.getAllMessages();
    }
}
