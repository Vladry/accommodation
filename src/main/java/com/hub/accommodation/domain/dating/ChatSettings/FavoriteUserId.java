package com.hub.accommodation.domain.dating.ChatSettings;

import com.hub.accommodation.domain.dating.DatingChatSettings;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data

public class FavoriteUserId {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long favoriteUserid;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dating_chat_settings_id")
    private DatingChatSettings datingChatSettings;
}
