package com.hub.accommodation.controller.chats;

import com.hub.accommodation.domain.dating.ChatSettings.InterlocutorStatus;
import com.hub.accommodation.domain.dating.ChatSettings.InterlocutorStatusEnum;
import com.hub.accommodation.domain.dating.Interlocutor;
import com.hub.accommodation.service.ChatService;
import com.hub.accommodation.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("${api.ver}/chats/correspondence")
public class CorrespondenceHandlingController {

    private final MessageService messageService;
    private final ChatService chatService;



    @PutMapping("/hideCorrespondenceForRecipient")
    public void hideCorrespondenceForRecipient(@RequestParam("chat") String chatName,
                                               @RequestParam("fromId") Long fromId,
                                               @RequestParam("toId") Long toId) {

        chatService.handleInterlocutorStatus(toId, fromId, InterlocutorStatusEnum.UNBLOCKED_CORRESPONDENCE_HIDDEN_FOR_RECIPIENT, chatName);

        //TODO удалить обработку кучи сообщений на след.строке:
        chatService.hideCorrespondenceForRecipient(chatName, fromId, toId);

    }

    @PutMapping("/hideCorrespondenceForInterlocutor")
    public void hideCorrespondenceForInterlocutor(@RequestParam("chat") String chatName,
                                                  @RequestParam("fromId") Long fromId,
                                                  @RequestParam("toId") Long toId) {

        chatService.handleInterlocutorStatus(toId, fromId, InterlocutorStatusEnum.UNBLOCKED_CORRESPONDENCE_HIDDEN_FOR_INTERLOCUTOR, chatName);

        //TODO удалить обработку кучи сообщений на след.строке:
        chatService.hideCorrespondenceForRecipient(chatName, fromId, toId);

    }


    @PutMapping("/hideCorrespondenceForAll")
    public void hideCorrespondenceForAll(@RequestParam("chat") String chatName,
                                         @RequestParam("fromId") Long fromId,
                                         @RequestParam("toId") Long toId) {

        chatService.handleInterlocutorStatus(toId, fromId, InterlocutorStatusEnum.UNBLOCKED_CORRESPONDENCE_HIDDEN_FOR_ALL, chatName);

        //TODO удалить обработку кучи сообщений на след.строке:
        chatService.hideCorrespondenceForAll(chatName, fromId, toId);

    }


    @DeleteMapping("/from/to")
    public void deleteCorrespondenceFromDB(
            @RequestParam("chat") String chatName,
            @RequestParam("fromId") Long fromId,
            @RequestParam("toId") Long toId) {
        messageService.deleteAllCorrespondenceBetweenFromIdAndToId(chatName, fromId, toId);
    }


}
