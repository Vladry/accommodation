package com.hub.accommodation.repository;

import com.hub.accommodation.domain.dating.ChatSettings.ChatType;
import com.hub.accommodation.domain.dating.DatingChatSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<DatingChatSettings, Long> {

    Optional<DatingChatSettings> getDatingChatSettingsByUserIdAndChatType(Long userId, ChatType chatType);

}
