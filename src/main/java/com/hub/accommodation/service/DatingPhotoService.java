package com.hub.accommodation.service;

import com.hub.accommodation.domain.Photo;
import com.hub.accommodation.domain.user.UserDB;
import com.hub.accommodation.domain.user.enums.ServiceGroup;
import com.hub.accommodation.repository.PhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional(timeout = 1000)
@RequiredArgsConstructor
public class DatingPhotoService extends GeneralService<UserDB> {

    private final PhotoRepository photoRepository;

    @Transactional(readOnly = true)
    public Set<Photo> findAllPhotosByUserIdAndServiceGroup(Long userId, ServiceGroup serviceGroup) {
        return photoRepository.findAllPhotosByUserIdAndServiceGroup(userId, serviceGroup);
    }


    @Transactional(readOnly = true)
    public Optional<Photo> findOnePhotoByUrl(String photoUrl) {
        return photoRepository.findOnePhotoByUrl(photoUrl);
    }


    public void saveAllPhotosData(Long userId, ServiceGroup serviceGroup, List<Photo> photoData) {
        photoData.forEach( onePhotoData -> {
            saveOnePhotoData(userId, serviceGroup, onePhotoData);
        });
    }

    public void saveOnePhotoData(Long userId, ServiceGroup serviceGroup, Photo onePhotoData) {
        onePhotoData.setServiceGroup(serviceGroup);
        onePhotoData.setUserId(userId);
        photoRepository.save(onePhotoData);
    }


    public void deleteOnePhotoByUrl(String url) {
        photoRepository.deleteOnePhotoByUrl(url);
    }

    public void deleteAllPhotosInGroup(Long userId, ServiceGroup serviceGroup) {
        photoRepository.deleteAllPhotosInGroupByUserIdAndServiceGroup(userId, serviceGroup);
    }
}
