package com.hub.accommodation.service;

import com.hub.accommodation.domain.AppUser;
import com.hub.accommodation.repository.AppUserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AppUserService {

    private final AppUserRepository appUserRepository;

    public AppUserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    public void save(AppUser appUser) {
        appUserRepository.save(appUser);
    }

    public Optional<AppUser> getAppUserById(Long id){
        return  Optional.of(appUserRepository.getById(id));
    }

    public Optional<AppUser> getAppUserByEmail(String email){
        return appUserRepository.findAppUserByEmail(email);
    }


}
