package com.hub.accommodation.repository;


import com.hub.accommodation.domain.Photo;
import com.hub.accommodation.domain.user.enums.ServiceGroup;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface PhotoRepository extends RepositoryInterface<Photo> {
//    @Modifying
//    @Query(value="INSERT INTO photos (user_id, service_group, url) VALUES(?1, ?2, ?3)", nativeQuery=true)
//    void saveAllPhotos(List<Long> userId, List<String> serviceGroup, List<String> photoUrls);

    Optional<Photo> findOnePhotoByUrl(String photoUrl);
    Set<Photo> findAllPhotosByUserIdAndServiceGroup(Long userId, ServiceGroup serviceGroup);


//    @Transactional
    @Modifying
    @Query(value="INSERT INTO photos (user_id, service_group, url) VALUES(?1, ?2, ?3)", nativeQuery=true)
    void saveOnePhoto(Long userId, String serviceGroup, String photoUrl);
//
    void deleteOnePhotoByUrl(String url);
    void deleteAllPhotosInGroupByUserIdAndServiceGroup(Long userId, ServiceGroup serviceGroup);


}
