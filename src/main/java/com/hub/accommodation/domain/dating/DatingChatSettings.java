package com.hub.accommodation.domain.dating;

import com.hub.accommodation.domain.dating.ChatSettings.ChatType;
import com.hub.accommodation.domain.dating.ChatSettings.FavoriteUserId;
import com.hub.accommodation.domain.dating.ChatSettings.MutedInterlocutorId;
import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@Table(name = "dating_chat_settings")
public class DatingChatSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    @Enumerated(EnumType.STRING)
    private ChatType chatType;
    private Long lastActiveChatUserId;
    @Column(name = "favorite_id")

    @OneToMany(mappedBy = "datingChatSettings", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private Set<FavoriteUserId> favoriteUserIds;
    @OneToMany(mappedBy = "datingChatSettings", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private Set<MutedInterlocutorId> mutedInterlocutorIds;

    private Boolean notificationSound = true;
    private Integer keepMediaFilesDays = 10;
    private String localMediaFilesFolder = "C:\\Users\\dating";
    private Integer photoSentQuality = 250;

 }
