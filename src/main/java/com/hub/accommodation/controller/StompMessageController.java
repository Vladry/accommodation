package com.hub.accommodation.controller;

import com.hub.accommodation.domain.StompMessage;
import com.hub.accommodation.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @DeleteMapping("/api/v1/messages")

    public void deleteMessage(@RequestBody StompMessage message) {
        messageService.deleteMessage(message);
    }

    @DeleteMapping("/api/v1/messages/{id}")
    public void deleteMessageById(@PathVariable("id") Long id) {
        messageService.deleteMessageById(id);
    }

    @GetMapping("/api/v1/messages/to/{id}")
    public Optional<StompMessage> getMessageByToId(@PathVariable("id") Long id) {
        return messageService.getMessageByToId(id);
    }

    @GetMapping("/api/v1/messages/from/{id}")
    public Optional<StompMessage> getMessageByFromId(@PathVariable("id") Long id) {
        return messageService.getMessageByFromId(id);
    }

    @GetMapping("/api/v1/messages/to")
    public Optional<StompMessage> getMessageByTypeAndToId(@RequestParam("type") String type, @RequestParam("id") Long id) {
        return messageService.getMessageByTypeAndToId(type, id);
    }

    @GetMapping("/api/v1/messages/from")
    public Optional<StompMessage> getMessageByTypeAndFromId(@RequestParam("type") String type, @RequestParam("id") Long id) {
        return messageService.getMessageByTypeAndFromId(type, id);
    }
}
