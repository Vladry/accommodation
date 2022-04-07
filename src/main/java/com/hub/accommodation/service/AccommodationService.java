package com.hub.accommodation.service;

import com.hub.accommodation.domain.accommodation.Accommodation;
import com.hub.accommodation.exception.NoDataFoundException;
import com.hub.accommodation.repository.AccommodationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccommodationService extends GeneralService<Accommodation> {

    private final AccommodationRepository accommodationRepository;

    public AccommodationService(AccommodationRepository accommodationRepository) {
        this.accommodationRepository = accommodationRepository;
    }

    //fixme
    public void update(Accommodation accommodation){
        Accommodation accInDb = accommodationRepository.findById(accommodation.getId())
                .orElseThrow(()-> new NoDataFoundException("object not found"));
        accInDb = accommodation;
        accommodationRepository.save(accInDb);
    }

    public List<Accommodation> findAllByAppUserId(Long appUserId){
        return accommodationRepository.findAllByUserId(appUserId);
    }
}
