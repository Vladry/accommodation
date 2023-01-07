package com.hub.accommodation.controller;

import com.hub.accommodation.domain.Message;
import com.hub.accommodation.domain.dating.ChatSettings.InterlocutorStatus;
import com.hub.accommodation.domain.dating.ChatSettings.InterlocutorStatusEnum;
import com.hub.accommodation.service.ChatService;
import com.hub.accommodation.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/chats")
public class ChatsController {

    private final MessageService messageService;
    private final ChatService chatService;


    @PutMapping("/setSeen/{fromId}/{toId}")
    public void setSeenTrue(@PathVariable("fromId") Long fromId, @PathVariable("toId") Long toId) {
        messageService.setSeenTrue(fromId, toId);
    }

    @GetMapping("/unseen/to/{id}")
    public List<Message> getUnseenMessageByChatAndToId(@RequestParam("chat") String chat, @PathVariable("id") Long id) {
        return messageService.getUnseenMessageByChatAndToId(chat, id);
    }

    @GetMapping("/from/to")
    public List<Message> getMessageByChatAndFromIdAndToId(@RequestParam("chat") String chat,
                                                          @RequestParam("fromId") Long fromId,
                                                          @RequestParam("toId") Long toId) {
        return messageService.getMessageByChatAndFromIdAndToId(chat, fromId, toId);
    }


    /*** БЛОК функционала работы с InterlocutorStatus для всех типов чатов (datingChatStatus,
     * accommodationChatStatus, volunteerChatStatus) обозначенных внутри InterlocutorStatus, определяющими фильтрацию загружаемых и показываемых сообщений.
     * см. файл InterlocutorContextMenu.js   ***/

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

}
