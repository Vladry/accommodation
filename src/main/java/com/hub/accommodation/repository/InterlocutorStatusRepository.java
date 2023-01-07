package com.hub.accommodation.repository;

import com.hub.accommodation.domain.dating.ChatSettings.InterlocutorStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface InterlocutorStatusRepository extends JpaRepository<InterlocutorStatus, Long> {
    Set<InterlocutorStatus> getAllInterlocutorsDatingChatStatusByUserId(Long userId);


    /*** Блок получения одного InterlocutorStatus для одного конкретного собеседника, в зависимости от целевого чата:  datingChatStatus, accommodationChatStatus, volunteerChatStatus ***/
    @Query("FROM InterlocutorStatus iStatus where iStatus.userId=:userId AND iStatus.interlocutorId=:interlocutorId " +
            "AND iStatus.datingChatStatus is not null")
    Optional<InterlocutorStatus> getDatingInterlocutorStatusByUserIdAndInterlocutorId(
            @Param("userId") Long userId, @Param("interlocutorId") Long interlocutorId);

    @Query("FROM InterlocutorStatus iStatus where iStatus.userId=:userId AND iStatus.interlocutorId=:interlocutorId " +
            "AND iStatus.accommodationChatStatus is not null")
    Optional<InterlocutorStatus> getAccommodationInterlocutorStatusByUserIdAndInterlocutorId(
            @Param("userId") Long userId, @Param("interlocutorId") Long interlocutorId);

    @Query("FROM InterlocutorStatus iStatus where iStatus.userId=:userId AND iStatus.interlocutorId=:interlocutorId " +
            "AND iStatus.volunteerChatStatus is not null")
    Optional<InterlocutorStatus> getVolunteerInterlocutorStatusByUserIdAndInterlocutorId(
            @Param("userId") Long userId, @Param("interlocutorId") Long interlocutorId);

    Optional<InterlocutorStatus> getAllChatsInterlocutorStatusByUserIdAndInterlocutorId(Long userId, Long interlocutorId);
/*** конец Блока получения одного InterlocutorStatus для одного конкретного собеседника, в зависимости от целевого чата:  datingChatStatus, accommodationChatStatus, volunteerChatStatus ***/




/*** Блока получения всех InterlocutorStatus в зависимости от целевого чата:  datingChatStatus, accommodationChatStatus, volunteerChatStatus ***/
    @Query("FROM InterlocutorStatus iStatus where iStatus.userId=:userId " +
            "AND iStatus.datingChatStatus is not null")
    Set<InterlocutorStatus> getAllDatingInterlocutorsStatusByUserId(
            @Param("userId") Long userId);

    @Query("FROM InterlocutorStatus iStatus where iStatus.userId=:userId " +
            "AND iStatus.accommodationChatStatus is not null")
    Set<InterlocutorStatus> getAllAccommodationInterlocutorsStatusByUserId(
            @Param("userId") Long userId);

    @Query("FROM InterlocutorStatus iStatus where iStatus.userId=:userId " +
            "AND iStatus.volunteerChatStatus is not null")
    Set<InterlocutorStatus> getAllVolunteerInterlocutorsStatusByUserId(
            @Param("userId") Long userId);


    Set<InterlocutorStatus> getAllChatsInterlocutorsStatusForAllInterlocutorsByUserId(Long userId);
/*** конец Блока получения всех InterlocutorStatus в зависимости от целевого чата:  datingChatStatus, accommodationChatStatus, volunteerChatStatus ***/

}
