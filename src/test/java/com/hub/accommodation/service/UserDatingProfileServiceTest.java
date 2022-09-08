package com.hub.accommodation.service;

import com.hub.accommodation.DTO.request.UserDatingProfileRqDto;
import com.hub.accommodation.domain.user.UserDatingProfile;
import com.hub.accommodation.facade.UserDatingProfileFacade;
import com.hub.accommodation.repository.UserDatingProfileRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import java.util.Optional;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UserDatingProfileServiceTest {

    @Mock
    private final UserDatingProfileRepository MockedUdpRepo = mock(UserDatingProfileRepository.class);
    private final UserDatingProfileFacade userDatingProfileFacade = new UserDatingProfileFacade();
//    private final UserDatingProfileService userDatingProfileService = new UserDatingProfileService();

    @Test
    public void shouldSaveByUserId(){
        UserDatingProfileRqDto udpRqDto = new UserDatingProfileRqDto().setUserId("19");
        UserDatingProfile udp = userDatingProfileFacade.convertToEntity(udpRqDto);
        when(MockedUdpRepo.findUserDatingProfileByUserId(10L)).thenReturn(Optional.of(new UserDatingProfile()));
        Optional<UserDatingProfile> oldSaved = MockedUdpRepo.findUserDatingProfileByUserId(udp.getUserId());

//        MockedUdpRepo.saveByUserId(udp);
    }
}