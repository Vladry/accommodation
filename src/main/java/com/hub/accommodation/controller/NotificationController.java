package com.hub.accommodation.controller;

import com.hub.accommodation.config.TextMessageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class NotificationController {

    @Autowired
    SimpMessagingTemplate template;

    @PostMapping("/privateMessage/{id}")
    public ResponseEntity<Void> sendMessage(
            @RequestBody TextMessageDTO textMessageDTO,
            @PathVariable("id") Long id) {
        template.convertAndSend("/queue/dating/"+id, textMessageDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/datingAnnouncement")
    public ResponseEntity<Void> sendDatingAnnouncement(@RequestBody TextMessageDTO textMessageDTO) {
        template.convertAndSend("/topic/dating.announcements", textMessageDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

//    @SendTo("/queue/dating")
//    public TextMessageDTO broadcastMessage(@Payload TextMessageDTO textMessageDTO) {
//        return textMessageDTO;
//    }
}
