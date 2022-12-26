package com.hub.accommodation.controller;

import com.hub.accommodation.domain.Message;
import com.hub.accommodation.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/messages")
public class ChatsController {

    private final MessageService messageService;



    @PutMapping("/setSeen/{fromId}/{toId}")
    public void setSeenTrue (@PathVariable("fromId") Long fromId, @PathVariable("toId") Long toId){
        messageService.setSeenTrue(fromId, toId);
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



/*** DELETE ***/
    @DeleteMapping("/chat/from/to")
    public void deleteMessagesByChatAndFromIdAndToId(@RequestParam("chat") String chat,
                                                     @RequestParam("fromId") Long fromId,
                                                     @RequestParam("toId") Long toId) {
        messageService.deleteAllCorrespondenceBetweenFromIdAndToId(chat, fromId, toId);
    }


}
