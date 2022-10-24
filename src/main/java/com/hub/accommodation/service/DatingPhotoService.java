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


    public void saveAllPhotos(Long userId_, ServiceGroup serviceGroup_, List<String> photoUrls) {
        List<Long> userId = new ArrayList<>(List.of(userId_, userId_, userId_));
        List<ServiceGroup> serviceGroup = List.of(serviceGroup_, serviceGroup_, serviceGroup_);

        List<Photo> lPhoto = new ArrayList<>();
        for (int index = 0; index < userId.size(); index++) {
            lPhoto.add(new Photo(null, userId.get(index), serviceGroup.get(index), photoUrls.get(index)));
            System.out.println("photoRepository_2.saveAllPhotos-> ");
            System.out.println("lPhoto: " + lPhoto);
        }
        photoJpaRepository.saveAll(lPhoto);
    }

//    public void saveAllPhotos(Long userId, ServiceGroup serviceGroup, List<String> photoUrls) {
//        photoRepository.saveAllPhotos(userId, serviceGroup.name(), photoUrls);
//    }

    public void saveOnePhoto(Long userId, ServiceGroup serviceGroup, String photoUrl) {
        photoRepository.saveOnePhoto(userId, serviceGroup.name(), photoUrl);
    }


    public void deleteOnePhotoByUrl(String url) {
        photoRepository.deleteOnePhotoByUrl(url);
    }

    public void deleteAllPhotosInGroup(Long userId, ServiceGroup serviceGroup) {
        photoRepository.deleteAllPhotosInGroupByUserIdAndServiceGroup(userId, serviceGroup);
    }
}
