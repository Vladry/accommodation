package com.hub.accommodation.service;

import com.hub.accommodation.DTO.request.UserDatingProfileRqDto;
import com.hub.accommodation.DTO.response.UserDatingProfileRsDto;
import com.hub.accommodation.domain.user.UserDatingProfile;
import com.hub.accommodation.domain.user.enums.Sex;
import com.hub.accommodation.facade.UserDatingProfileFacade;
import com.hub.accommodation.repository.UserDatingProfileRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.util.Optional;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UserDatingProfileServiceTest {


    @Mock
    private final UserDatingProfileFacade udpFacade;
    @Mock
    private final UserDatingProfileRepository mockedUdpRepo = mock(UserDatingProfileRepository.class);

    @InjectMocks
    private final UserDatingProfileService udpService;

    UserDatingProfileServiceTest(UserDatingProfileFacade udpFacade, UserDatingProfileService udpService) {
        this.udpFacade = udpFacade;
        this.udpService = udpService;
    }

    @Test
    public void should_saveByUserId_success() {
//        UserDatingProfileRqDto rqDtoTest = new UserDatingProfileRqDto().setUserId("1").setMySex("ANY");
//        when(mockedUdpRepo.findUserDatingProfileByUserId(1L)).thenReturn(Optional.of(new UserDatingProfile()
//                .setUserId(1L).setMySex(Sex.ANY)));
//
//
//        UserDatingProfileRsDto rsDtoTest = udpService.saveByUserId(rqDtoTest);
//        UserDatingProfile udp = udpFacade.convertToEntity(rqDtoTest);
//        when(mockedUdpRepo.findUserDatingProfileByUserId(10L)).thenReturn(Optional.of(new UserDatingProfile()));
//        Optional<UserDatingProfile> oldSaved = mockedUdpRepo.findUserDatingProfileByUserId(udp.getUserId());

//        MockedUdpRepo.saveByUserId(udp);
    }
}