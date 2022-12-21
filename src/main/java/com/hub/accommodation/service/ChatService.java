package com.hub.accommodation.service;

import com.hub.accommodation.domain.dating.ChatSettings.ChatType;
import com.hub.accommodation.domain.dating.DatingChatSettings;
import com.hub.accommodation.domain.dating.Interlocutor;
import com.hub.accommodation.domain.user.User;
import com.hub.accommodation.repository.ChatRepository;
import com.hub.accommodation.repository.MessageRepository;
import com.hub.accommodation.repository.UserRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

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

    @Transactional(readOnly = true)
    public Optional<DatingChatSettings> getDatingChatSettings(Long userId, ChatType chatType){
        return chatRepository.getDatingChatSettingsByUserIdAndChatType(userId, chatType);
    }

    public void saveDatingChatSettings(DatingChatSettings settings){
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

}
