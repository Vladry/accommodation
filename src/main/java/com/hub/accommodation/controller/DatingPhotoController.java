package com.hub.accommodation.controller;

import com.hub.accommodation.domain.Photo;
import com.hub.accommodation.domain.user.enums.ServiceGroup;
import com.hub.accommodation.service.DatingPhotoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


//@Validated
@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/users")
public class DatingPhotoController {

    private final DatingPhotoService datingService;

    //------------------------------------------------

    @GetMapping("/photos/all/{userId}")
    public Set<String> findAllPhotosByUserIdAndServiceGroup(@PathVariable("userId") Long userId,
                                                            @RequestParam("serviceGroup") ServiceGroup serviceGroup) {
        return datingService.findAllPhotosByUserIdAndServiceGroup(userId, serviceGroup).stream().map(Photo::getUrl).collect(Collectors.toSet());
    }


    @GetMapping("/photos")
    public Photo findOnePhotoByUrl(@RequestParam("url") String photoUrl) {
        Optional<Photo> urlOpt = datingService.findOnePhotoByUrl(photoUrl);
        Photo p = null;
        if (urlOpt.isPresent()) {
            p = urlOpt.get();
        }
        return p;
    }


    @PostMapping("/photos/{userId}")
    public void saveAllPhotos(@PathVariable("userId") Long userId,
                              @RequestParam("serviceGroup") ServiceGroup serviceGroup,
                              @RequestBody List<String> photoUrls) {
        datingService.saveAllPhotos(userId, serviceGroup, photoUrls);
    }

    @PutMapping("/photos/{userId}")
    public void saveOnePhoto(@PathVariable("userId") Long userId,
                             @RequestParam("serviceGroup") ServiceGroup serviceGroup,
                             @RequestParam("url") String photoUrl) {
        datingService.saveOnePhoto(userId, serviceGroup, photoUrl);
    }

    @DeleteMapping("/photos")
    public void deleteOnePhotoByUrl(@RequestParam("url") String url) {
        datingService.deleteOnePhotoByUrl(url);
    }


    @DeleteMapping("/photos/{userId}")
    public void deleteAllPhotosInGroup(@PathVariable("userId") Long userId,
                                       @RequestParam("serviceGroup") ServiceGroup serviceGroup) {
        datingService.deleteAllPhotosInGroup(userId, serviceGroup);
    }


}
