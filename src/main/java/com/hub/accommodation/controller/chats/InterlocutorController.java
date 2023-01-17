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


/*** БЛОК функционала работы с InterlocutorStatus для всех типов чатов (datingChatStatus,
 * accommodationChatStatus, volunteerChatStatus) обозначенных внутри InterlocutorStatus, определяющими фильтрацию загружаемых и показываемых сообщений.
 * см. файл InterlocutorContextMenu.js   ***/


@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/chats/interlocutors")
public class InterlocutorController {

    private final MessageService messageService;
    private final ChatService chatService;




    @PutMapping("/blockInterlocutorHideCorrespondenceForAll")
    public void blockInterlocutorHideCorrespondenceForAll(@RequestParam("chat") String chatName,
                                                          @RequestParam("fromId") Long fromId,
                                                          @RequestParam("toId") Long toId) {
        chatService.handleInterlocutorStatus(toId, fromId, InterlocutorStatusEnum.BLOCKED_CORRESPONDENCE_HIDDEN_FOR_ALL, chatName);

        //TODO удалить обработку кучи сообщений на след.строке:
        chatService.hideCorrespondenceForAll(chatName, fromId, toId);
    }

    @PutMapping("/blockInterlocutorLeaveCorrespondenceForAll")
    public void blockInterlocutorLeaveCorrespondenceForAll(@RequestParam("chat") String chatName,
                                                           @RequestParam("fromId") Long fromId,
                                                           @RequestParam("toId") Long toId) {
        chatService.handleInterlocutorStatus(toId, fromId, InterlocutorStatusEnum.BLOCKED_CORRESPONDENCE_AVAILABLE_FOR_ALL, chatName);
    }

    @PutMapping("/blockInterlocutorLeaveCorrespondenceForRecipient")
    public void blockInterlocutorLeaveCorrespondenceForRecipient(@RequestParam("chat") String chatName,
                                                                 @RequestParam("fromId") Long fromId,
                                                                 @RequestParam("toId") Long toId) {
        chatService.handleInterlocutorStatus(toId, fromId, InterlocutorStatusEnum.BLOCKED_CORRESPONDENCE_AVAILABLE_FOR_RECIPIENT, chatName);
    }

    @PutMapping("/blockInterlocutorDeleteAllCorrespondence")
    public void blockInterlocutorDeleteAllCorrespondence(@RequestParam("chat") String chatName,
                                                         @RequestParam("fromId") Long fromId,
                                                         @RequestParam("toId") Long toId) {
        chatService.handleInterlocutorStatus(toId, fromId, InterlocutorStatusEnum.BLOCKED_CORRESPONDENCE_DELETED, chatName);
        messageService.deleteAllCorrespondenceBetweenFromIdAndToId(chatName, fromId, toId);
    }

    @PutMapping("/unBlockInterlocutorAndShowCorrespondence")
    public void unBlockInterlocutorAndShowCorrespondence(@RequestParam("chat") String chatName,
                                                         @RequestParam("fromId") Long fromId,
                                                         @RequestParam("toId") Long toId) {
        chatService.handleInterlocutorStatus(toId, fromId, InterlocutorStatusEnum.UNBLOCKED, chatName);

        //TODO удалить обработку кучи сообщений на след.строке:
        chatService.unHideCorrespondenceForAll(chatName, fromId, toId);
    }


    @GetMapping("/interlocutorStatus")
    public Optional<InterlocutorStatus> getInterlocutorStatus(@RequestParam("toId") Long userId,
                                                              @RequestParam("fromId") Long interlocutorId,
                                                              @RequestParam("chat") String chatName) {
        return chatService.getInterlocutorStatus(userId, interlocutorId, chatName);
    }

    @GetMapping("/allInterlocutorsStatus")
    public Set<InterlocutorStatus> getAllInterlocutorsStatus(@RequestParam("toId") Long userId,
                                                             @RequestParam("chat") String chatName) {
        return chatService.getAllInterlocutorsStatus(userId, chatName);
    }
/*** конец БЛОКа функционала работы с InterlocutorStatus ***/



@GetMapping("/interlocutors/{toId}")
public Set<Interlocutor> getInterlocutorsByToId(@RequestParam("chat") String chat, @PathVariable("toId") Long toId) {
    return chatService.getInterlocutorsByChatAndToId(chat, toId);
}
}
