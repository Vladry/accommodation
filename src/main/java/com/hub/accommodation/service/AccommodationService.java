package com.hub.accommodation.service;

import com.hub.accommodation.domain.Accommodation;
import com.hub.accommodation.exception.NoDataFoundException;
import com.hub.accommodation.repository.AccommodationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccommodationService {

    private final AccommodationRepository accommodationRepository;

    public AccommodationService(AccommodationRepository accommodationRepository) {
        this.accommodationRepository = accommodationRepository;
    }

    public void save(Accommodation accommodation){
        accommodationRepository.save(accommodation);
    }

    //fixme
    public void update(Accommodation accommodation){
        Accommodation accInDb = accommodationRepository.findById(accommodation.getId())
                .orElseThrow(()-> new NoDataFoundException("object not found"));
        accInDb = accommodation;
        accommodationRepository.save(accInDb);
    }

    public Optional<Accommodation> findById(Long id){
        return accommodationRepository.findById(id);
    }

    public List<Accommodation> findAllByAppUserId(Long appUserId){
        return accommodationRepository.findAllByUserId(appUserId);
    }
}
