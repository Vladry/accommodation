package com.hub.accommodation.controller.chats;

import com.hub.accommodation.domain.dating.ChatSettings.InterlocutorStatus;
import com.hub.accommodation.domain.dating.ChatSettings.InterlocutorStatusEnum;
import com.hub.accommodation.domain.dating.Interlocutor;
import com.hub.accommodation.service.ChatService;
import com.hub.accommodation.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;


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
    public void blockInterlocutorHideCorrespondenceForAll(@RequestParam("chat") String chatStatus,
                                                          @RequestParam("fromId") Long fromId,
                                                          @RequestParam("toId") Long toId) {
        chatService.handleInterlocutorStatus(toId, fromId, InterlocutorStatusEnum.BLOCKED_CORRESPONDENCE_HIDDEN_FOR_ALL, chatStatus);

        //TODO удалить обработку кучи сообщений на след.строке:
        chatService.hideCorrespondenceForAll(chatStatus, fromId, toId);
    }

    @PutMapping("/blockInterlocutorLeaveCorrespondenceForAll")
    public void blockInterlocutorLeaveCorrespondenceForAll(@RequestParam("chat") String chatStatus,
                                                           @RequestParam("fromId") Long fromId,
                                                           @RequestParam("toId") Long toId) {
        chatService.handleInterlocutorStatus(toId, fromId, InterlocutorStatusEnum.BLOCKED_CORRESPONDENCE_AVAILABLE_FOR_ALL, chatStatus);
    }

    @PutMapping("/blockInterlocutorLeaveCorrespondenceForRecipient")
    public void blockInterlocutorLeaveCorrespondenceForRecipient(@RequestParam("chat") String chatStatus,
                                                                 @RequestParam("fromId") Long fromId,
                                                                 @RequestParam("toId") Long toId) {
        chatService.handleInterlocutorStatus(toId, fromId, InterlocutorStatusEnum.BLOCKED_CORRESPONDENCE_AVAILABLE_FOR_RECIPIENT, chatStatus);
    }

    @PutMapping("/blockInterlocutorDeleteAllCorrespondence")
    public void blockInterlocutorDeleteAllCorrespondence(@RequestParam("chat") String chatStatus,
                                                         @RequestParam("fromId") Long fromId,
                                                         @RequestParam("toId") Long toId) {
        chatService.handleInterlocutorStatus(toId, fromId, InterlocutorStatusEnum.BLOCKED_CORRESPONDENCE_DELETED, chatStatus);
        messageService.deleteAllCorrespondenceBetweenFromIdAndToId(chatStatus, fromId, toId);
    }

    @PutMapping("/unBlockInterlocutorAndShowCorrespondence")
    public void unBlockInterlocutorAndShowCorrespondence(@RequestParam("chat") String chatStatus,
                                                         @RequestParam("fromId") Long fromId,
                                                         @RequestParam("toId") Long toId) {
        chatService.handleInterlocutorStatus(toId, fromId, InterlocutorStatusEnum.UNBLOCKED, chatStatus);

        //TODO удалить обработку кучи сообщений на след.строке:
        chatService.unHideCorrespondenceForAll(chatStatus, fromId, toId);
    }


    @GetMapping("/interlocutorStatus")
    public Optional<InterlocutorStatus> getInterlocutorStatus(@RequestParam("toId") Long userId,
                                                              @RequestParam("fromId") Long interlocutorId,
                                                              @RequestParam("chat") String chatStatus) {
        return chatService.getInterlocutorStatus(userId, interlocutorId, chatStatus);
    }

    @GetMapping("/allInterlocutorsStatus")
    public Set<InterlocutorStatus> getAllInterlocutorsStatus(@RequestParam("toId") Long userId,
                                                             @RequestParam("chat") String chatStatus) {
        return chatService.getAllInterlocutorsStatus(userId, chatStatus);
    }


    @GetMapping("/interlocutors/{toId}")
    public Set<Interlocutor> getInterlocutorsByToId(@RequestParam("chat") String chat, @PathVariable("toId") Long toId) {
        return chatService.getInterlocutorsByChatAndToId(chat, toId);
    }


    @GetMapping("/allowedInterlocutors/{toId}")
    public Set<Interlocutor> getAllowedInterlocutorsByToId(@RequestParam("chat") String chatStatus, @PathVariable("toId") Long toId) {

        Set<InterlocutorStatus> interlocutorsStatus = chatService.getAllInterlocutorsStatus(toId, chatStatus);
        Set<Interlocutor> allInterlocutors = chatService.getInterlocutorsByChatAndToId(chatStatus, toId);
        // после получения всех-всех имеющихся собеседников allInterlocutors которые когда-либо были, включая заблокированных и удаленных - далее получить статусы собеседников для дальнейшей фильтрации:
        Set<Interlocutor> notBlockedInterlocutors = allInterlocutors.stream().filter(
                interlocutor -> {
                    AtomicBoolean allowed = new AtomicBoolean(true);
                    interlocutorsStatus.forEach((status) -> {
                        if (
                                Objects.equals(interlocutor.getUserId(), status.getInterlocutorId())
                                        &&
                                        (status.getDatingChatStatus() == InterlocutorStatusEnum.BLOCKED_CORRESPONDENCE_HIDDEN_FOR_ALL
                                                || status.getDatingChatStatus() == InterlocutorStatusEnum.BLOCKED_CORRESPONDENCE_DELETED)

                        ) {
                            allowed.set(false);
                        }
                    });
                    return allowed.get();
                }).collect(Collectors.toSet());


        Set<Interlocutor> markedInterlocutors = notBlockedInterlocutors.stream().map(
                interlocutor -> {
                    AtomicBoolean blacklisted = new AtomicBoolean(false);
                    interlocutorsStatus.forEach((status) -> {
                        if (
                                (status.getDatingChatStatus() == InterlocutorStatusEnum.BLOCKED_CORRESPONDENCE_AVAILABLE_FOR_ALL
                                        || status.getDatingChatStatus() == InterlocutorStatusEnum.BLOCKED_CORRESPONDENCE_AVAILABLE_FOR_RECIPIENT)

                        ) {
                            blacklisted.set(true);

                        }
                    });
                    interlocutor.setBlacklisted(blacklisted.get());
                    return interlocutor;
                }
        ).collect(Collectors.toSet());

        return markedInterlocutors;
    }
}
