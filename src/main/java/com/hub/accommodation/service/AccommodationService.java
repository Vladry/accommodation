package com.hub.accommodation.service;

import com.hub.accommodation.domain.accommodation.Accommodation;
import com.hub.accommodation.exception.NoDataFoundException;
import com.hub.accommodation.repository.AccommodationRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Service
@Transactional
public class AccommodationService extends GeneralService<Accommodation> {

    private final AccommodationRepository accommodationRepository;

    public AccommodationService(AccommodationRepository accommodationRepository) {
        this.accommodationRepository = accommodationRepository;
    }

    //fixme
    public void update(Accommodation accommodation){
        Accommodation accInDb = accommodationRepository.findById(accommodation.getId())
                .orElseThrow(()-> new NoDataFoundException("object not found")); // https://habr.com/ru/post/346782/
        accInDb = accommodation;
        accommodationRepository.save(accInDb);
    }




    // ------------завершённые рабочие методы ------------------------
    public List<Accommodation> findAllByUserId(Long userId){
        return accommodationRepository.findAllByUserId(userId);
    }

    @Override
    public Page<Accommodation> findAll(Pageable pageable) {
        return accommodationRepository.findAll(pageable);
    }

}
