package com.hub.accommodation.service;

import com.hub.accommodation.domain.Message;
import com.hub.accommodation.domain.dating.ChatSettings.ChatType;
import com.hub.accommodation.domain.dating.ChatSettings.InterlocutorStatus;
import com.hub.accommodation.domain.dating.ChatSettings.InterlocutorStatusEnum;
import com.hub.accommodation.domain.dating.DatingChatSettings;
import com.hub.accommodation.domain.dating.Interlocutor;
import com.hub.accommodation.domain.user.User;
import com.hub.accommodation.repository.ChatRepository;
import com.hub.accommodation.repository.InterlocutorStatusRepository;
import com.hub.accommodation.repository.MessageRepository;
import com.hub.accommodation.repository.UserRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatService {

    private final UserRepositoryImpl userRepositoryImpl;
    private final MessageRepository messageRepository;
    private final ChatRepository chatRepository;
    private final InterlocutorStatusRepository interlocutorStatusRepository;

    @Transactional(readOnly = true)
    public Optional<DatingChatSettings> getDatingChatSettings(Long userId, ChatType chatType) {
        return chatRepository.getDatingChatSettingsByUserIdAndChatType(userId, chatType);
    }

    public void saveDatingChatSettings(DatingChatSettings settings) {
        chatRepository.save(settings);
    }

    @Transactional(readOnly = true)
    public Set<Interlocutor> getInterlocutorsByChatAndToId(String chat, Long toId) {
        List<Long> sendersIds = messageRepository.getFromIdDistinctByChatAndToIdOrderByCreatedDate(chat, toId);
        Set<Long> addreceesIds = messageRepository.getToIdDistinctByChatAndFromIdOrderByCreatedDate(chat, toId);
        sendersIds.addAll(addreceesIds);
        List<User> users = userRepositoryImpl.findAllByIds(sendersIds);
        return users.stream().map(user ->
                        new Interlocutor(user.getId(), user.getAvatar(), user.getName(), user.getLastName()))
                .collect(Collectors.toSet());
    }


    public void hideCorrespondenceForAll(String chat, Long fromId, Long toId) {
        List<Message> msgs = messageRepository.getMessageByChatAndFromIdAndToId(chat, fromId, toId);
        List<Message> msgs2 = messageRepository.getMessageByChatAndFromIdAndToId(chat, toId, fromId);
        msgs.addAll(msgs2);
        Set<Message> updated = msgs.stream().peek(
                m -> {
                    m.setHiddenForSender(true);
                    m.setHiddenForRecipient(true);
                }
        ).collect(Collectors.toSet());
        messageRepository.saveAll(updated);
    }

    public void unHideCorrespondenceForAll(String chat, Long fromId, Long toId) {
        List<Message> msgs = messageRepository.getMessageByChatAndFromIdAndToId(chat, fromId, toId);
        List<Message> msgs2 = messageRepository.getMessageByChatAndFromIdAndToId(chat, toId, fromId);
        msgs.addAll(msgs2);
        Set<Message> updated = msgs.stream().peek(
                m -> {
                    m.setHiddenForSender(false);
                    m.setHiddenForRecipient(false);
                }
        ).collect(Collectors.toSet());
        messageRepository.saveAll(updated);
    }

    public void hideCorrespondenceForRecipient(String chat, Long fromId, Long toId) {
        List<Message> msgs = messageRepository.getMessageByChatAndFromIdAndToId(chat, fromId, toId);
        Set<Message> updated = msgs.stream().peek(
                m -> {
                    m.setHiddenForRecipient(true);
                }
        ).collect(Collectors.toSet());
        messageRepository.saveAll(updated);
    }

    public void handleInterlocutorStatus(Long userId, Long interlocutorId, InterlocutorStatusEnum newStatus, String chatStatus) {
        getInterlocutorStatus(userId, interlocutorId, chatStatus).ifPresentOrElse(
                (existingInterlocutorStatus) -> {
                    try {
                        Field f = existingInterlocutorStatus.getClass().getDeclaredField(chatStatus);
                        f.setAccessible(true);
                        f.set(existingInterlocutorStatus, newStatus);
                    } catch (NoSuchFieldException | IllegalAccessException e) {
                        throw new RuntimeException(e);
                    }
                    interlocutorStatusRepository.save(existingInterlocutorStatus);

                },
                () -> {
                    InterlocutorStatus newInterlocutorStatus = new InterlocutorStatus()
                            .setUserId(userId).setInterlocutorId(interlocutorId);

                    try {
                        Field f = newInterlocutorStatus.getClass().getDeclaredField(chatStatus);
                        f.setAccessible(true);
                        f.set(newInterlocutorStatus, newStatus);
                    } catch (NoSuchFieldException | IllegalAccessException e) {
                        throw new RuntimeException(e);
                    }

                    interlocutorStatusRepository.save(newInterlocutorStatus);
                }
        );


    }


    public Optional<InterlocutorStatus> getInterlocutorStatus(Long userId, Long interlocutorId, String chatStatus) {

        return switch (chatStatus) {
            case "datingChatStatus" -> interlocutorStatusRepository.getDatingInterlocutorStatusByUserIdAndInterlocutorId(userId, interlocutorId);
            case "accommodationChatStatus" ->
                    interlocutorStatusRepository.getAccommodationInterlocutorStatusByUserIdAndInterlocutorId(userId, interlocutorId);
            case "volunteerChatStatus" ->
                    interlocutorStatusRepository.getVolunteerInterlocutorStatusByUserIdAndInterlocutorId(userId, interlocutorId);
            default -> interlocutorStatusRepository.getAllChatsInterlocutorStatusByUserIdAndInterlocutorId(userId, interlocutorId);
        };


    }

    public Set<InterlocutorStatus> getAllInterlocutorsStatus(Long userId, String chatStatus) {

        return switch (chatStatus) {
            case "datingChatStatus" -> interlocutorStatusRepository.getAllDatingInterlocutorsStatusByUserId(userId);
            case "accommodationChatStatus" ->
                    interlocutorStatusRepository.getAllAccommodationInterlocutorsStatusByUserId(userId);
            case "volunteerChatStatus" ->
                    interlocutorStatusRepository.getAllVolunteerInterlocutorsStatusByUserId(userId);

            default -> interlocutorStatusRepository.getAllChatsInterlocutorsStatusForAllInterlocutorsByUserId(userId);
        };

    }


}
