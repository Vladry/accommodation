package com.hub.accommodation.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class MessageController {

    @Autowired
    SimpMessagingTemplate template;

    @PostMapping("/send")
    public ResponseEntity<Void> sendMessage(@RequestBody TextMessageDTO textMessageDTO) {
        template.convertAndSend("/queue/dating", textMessageDTO);
        System.out.println("send to /queue/dating: " +textMessageDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

//    @SendTo("/queue/dating")
//    public TextMessageDTO broadcastMessage(@Payload TextMessageDTO textMessageDTO) {
//        return textMessageDTO;
//    }
}
