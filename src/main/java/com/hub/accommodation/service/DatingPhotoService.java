package com.hub.accommodation.service;

import com.hub.accommodation.domain.Photo;
import com.hub.accommodation.domain.user.User;
import com.hub.accommodation.domain.user.enums.ServiceGroup;
import com.hub.accommodation.repository.PhotoRepository;
import com.hub.accommodation.repository.PhotoJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional(timeout = 1000)
@RequiredArgsConstructor
public class DatingPhotoService extends GeneralService<User> {

    private final PhotoRepository photoRepository;
    private final PhotoJpaRepository photoJpaRepository;

    @Transactional(readOnly = true)
    public Set<Photo> findAllPhotosByUserIdAndServiceGroup(Long userId, ServiceGroup serviceGroup) {
        return photoRepository.findAllPhotosByUserIdAndServiceGroup(userId, serviceGroup);
    }


    @Transactional(readOnly = true)
    public Optional<Photo> findOnePhotoByUrl(String photoUrl) {
        return photoRepository.findOnePhotoByUrl(photoUrl);
    }


    public void saveAllPhotosData(Long userId, ServiceGroup serviceGroup, List<String> photoData) {
        System.out.println("service.saveAllPhotos-> ");
        System.out.println("userId: "+ userId);
        System.out.println("serviceGroup: "+serviceGroup);
        System.out.println("photoData: "+photoData);

        photoData.forEach( onePhotoData -> {
            saveOnePhotoData(userId, serviceGroup, onePhotoData);
        });
    }

    public void saveOnePhotoData(Long userId, ServiceGroup serviceGroup, String photoUrl) {
        photoRepository.saveOnePhotoData(userId, serviceGroup.name(), photoUrl);
    }


    public void deleteOnePhotoByUrl(String url) {
        photoRepository.deleteOnePhotoByUrl(url);
    }

    public void deleteAllPhotosInGroup(Long userId, ServiceGroup serviceGroup) {
        photoRepository.deleteAllPhotosInGroupByUserIdAndServiceGroup(userId, serviceGroup);
    }
}
