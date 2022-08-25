package com.hub.accommodation.controller;

import com.hub.accommodation.DTO.request.AccommodationRqDto;
import com.hub.accommodation.DTO.request.RqAccPage;
import com.hub.accommodation.DTO.response.AccommodationRsDto;
import com.hub.accommodation.domain.accommodation.Accommodation;
import com.hub.accommodation.exception.NoDataFoundException;
import com.hub.accommodation.facade.AccommodationFacade;
import com.hub.accommodation.service.AccommodationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/accommodations")
public class AccommodationController {
    private final AccommodationService accommodMainService;
    private final AccommodationFacade accommodMainFacade;
    private final AccommodationFacade accFacade;

    public AccommodationController(AccommodationService accommodMainService, AccommodationFacade accommodMainFacade, AccommodationFacade accFacade) {
        this.accommodMainService = accommodMainService;
        this.accommodMainFacade = accommodMainFacade;
        this.accFacade = accFacade;
    }

    @PostMapping
//    @PreAuthorize("hasAuthority('writeAccommodation')") //TODO -сделать PreAuthorize для все аналогичных методов
    public void save(
            @RequestBody AccommodationRqDto accommodationRqDto) {
        Accommodation accommodation = accommodMainFacade.convertToEntity(accommodationRqDto);
        accommodMainService.save(accommodation);
    }

    //fixme
    public void update(Accommodation accommodation) {
        Accommodation accInDb = accommodMainService.findById(accommodation.getId())
                .orElseThrow(() -> new NoDataFoundException("object not found")); //https://habr.com/ru/post/346782/
        accInDb = accommodation;
        accommodMainService.save(accInDb);
    }

    @GetMapping("/{id}")
//    @PreAuthorize("hasAuthority('read')")
    public AccommodationRsDto findById(@PathVariable("id") Long id) {
        Optional<Accommodation> byId = accommodMainService.findById(id);
        System.out.println("byId: " + byId);
        return byId.map(accommodMainFacade::convertToDto).orElse(null);
    }

    @PostMapping("/{id}")
//    @PreAuthorize("hasAuthority('read')")
    public List<Accommodation> findAllByUserId(@PathVariable("id") Long userId) {
        return accommodMainService.findAllByUserId(userId);
    }

    @PostMapping("/filter")
    public Page<Accommodation> findAllMatcingByFilter(@RequestBody RqAccPage rqPage) {
        Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, rqPage.getSearchCriteria()));
        Pageable pageable = PageRequest.of(rqPage.getPageNumber(), rqPage.getPageSize(), sort);
        return accommodMainService.findAll(pageable);
    }
}