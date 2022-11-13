package com.hub.accommodation.controller;

import com.hub.accommodation.domain.StompMessage;
import com.hub.accommodation.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*") //TODO это обязательно во всех контроллерах. Но, при деплое -поудалять!
@RequestMapping("/api/v1/messages")
public class StompMessageController {

    private final MessageService messageService;

    @PostMapping
    public void saveMessage(@RequestBody StompMessage message) {
        messageService.saveMessage(message);
    }

    @DeleteMapping

    public void deleteMessage(@RequestBody StompMessage message) {
        messageService.deleteMessage(message);
    }

    @DeleteMapping("/{id}")
    public void deleteMessageById(@PathVariable("id") Long id) {
        messageService.deleteMessageById(id);
    }

    @GetMapping("/to/{id}")
    public List<StompMessage> getMessageByToId(@PathVariable("id") Long id) {
        return messageService.getMessageByToId(id);
    }

    @GetMapping("/from/{id}")
    public List<StompMessage> getMessageByFromId(@PathVariable("id") Long id) {
        return messageService.getMessageByFromId(id);
    }

    @GetMapping("/to")
    public List<StompMessage> getMessageByTypeAndToId(@RequestParam("type") String type, @RequestParam("id") Long id) {
        return messageService.getMessageByTypeAndToId(type, id);
    }

    @GetMapping("/from")
    public List<StompMessage> getMessageByTypeAndFromId(@RequestParam("type") String type, @RequestParam("id") Long id) {
        return messageService.getMessageByTypeAndFromId(type, id);
    }


    @GetMapping("/isLikedBy")
    public List<StompMessage> getMessageByTypeAndFromIdAndToId(@RequestParam("type") String type,
                                                               @RequestParam("fromId") Long fromId,
                                                               @RequestParam("toId") Long toId) {
        return messageService.getMessageByTypeAndFromIdAndToId(type, fromId, toId);
    }

    @DeleteMapping("/isLikedBy")
    public void deleteMessageByTypeAndFromIdAndToId(@RequestParam("type") String type,
                                                               @RequestParam("fromId") Long fromId,
                                                               @RequestParam("toId") Long toId) {
         messageService.deleteMessageByTypeAndFromIdAndToId(type, fromId, toId);
    }


    @GetMapping("/fromType")
    public List<StompMessage> getMessageByType(@RequestParam("type") String type) {
        return messageService.getMessageByType(type);
    }

    @GetMapping("/all")
    public List<StompMessage> getAllMessages() {
        return messageService.getAllMessages();
    }
}
