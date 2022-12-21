package com.hub.accommodation.controller;

import com.hub.accommodation.domain.dating.ChatSettings.ChatType;
import com.hub.accommodation.domain.dating.DatingChatSettings;
import com.hub.accommodation.domain.dating.Interlocutor;
import com.hub.accommodation.repository.UserRepositoryImpl;
import com.hub.accommodation.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/chats")
public class ChatController {

    private final ChatService chatService;

    @GetMapping("/settings/{userId}")
    public DatingChatSettings getDatingChatSettings(@PathVariable("userId") Long userId,
                                                    @RequestParam("chatType") ChatType chatType){
        return chatService.getDatingChatSettings(userId, chatType).orElse(null);
    }

    @PostMapping("/settings")
    public void saveDatingChatSettings(@RequestBody DatingChatSettings settings){
        chatService.saveDatingChatSettings(settings);
    }

    @GetMapping("/interlocutors/{toId}")
    public Set<Interlocutor> getInterlocutorsByToId(@RequestParam("chat") String chat, @PathVariable("toId") Long toId) {
        return chatService.getInterlocutorsByChatAndToId(chat, toId);
    }
}
