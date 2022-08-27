package com.hub.accommodation.controller;

import com.hub.accommodation.DTO.response.UserDatingProfileRsDto;
import com.hub.accommodation.domain.user.UserDatingProfile;
import com.hub.accommodation.exception.CreatingEntityFailed;
import com.hub.accommodation.facade.UserDatingProfileFacade;
import com.hub.accommodation.facade.UserFacade;
import com.hub.accommodation.DTO.request.UserRqDto;
import com.hub.accommodation.DTO.response.UserRsDto;
import com.hub.accommodation.domain.user.User;
import com.hub.accommodation.exception.NoDataFoundException;
import com.hub.accommodation.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.lang.reflect.Array;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Validated
@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    private final UserFacade userFacade;
    private final UserDatingProfileFacade userDatingProfileFacade;

    @PersistenceUnit
    private final EntityManagerFactory entityManagerFactory;

    //------------------------------------------------
//    @PreAuthorize("hasAuthority('read')")
    @GetMapping("/{id}")
    public UserRsDto findUserById(
            @PathVariable("id") Long id) {
        Optional<User> optionalUser = userService.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return userFacade.convertToDto(user);
        } else {
            return null;
        }

    }
//------------------------------------------------

    public UserDatingProfile findUserDatingProfileEntityById(
            Long id
    ) {
        UserDatingProfile userDatingProfile = null;
        if (userService.findUserDatingProfileById(id).isPresent()) {
            userDatingProfile = userService.findUserDatingProfileById(id).get();
            return userDatingProfile;
        } else {
            return null;
        }

    }


    //    @PreAuthorize("hasAuthority('read')")
    @GetMapping("/{id}/datingProfile")
    public UserDatingProfileRsDto findUserDatingProfileById(
            @PathVariable("id") Long id
    ) {
        UserDatingProfile userDatingProfile = null;
        if (userService.findUserDatingProfileById(id).isPresent()) {
            userDatingProfile = userService.findUserDatingProfileById(id).get();
            return userDatingProfileFacade.convertToDto(userDatingProfile);
        } else {
            return null;
        }

    }

    @PostMapping
    public UserRsDto createUser(@RequestBody UserRqDto userRqDto) {
        try {
            User user = userFacade.convertToEntity(userRqDto);
            userService.save(user);
            log.info("in createUser: new user (user.name: " + userRqDto.getName() + " " + userRqDto.getLastName() + " created");
            return findUserByEmail(user.getEmail());
        } catch (Exception e) {
            log.error("error creating a new user: " + userRqDto.getName() + " " + userRqDto.getLastName());
            throw new CreatingEntityFailed("error creating a new user");
        }
    }

    @PreAuthorize("hasAuthority('read')")
    @GetMapping("/profile")
    public UserRsDto getUserProfile(Principal principal) {
        return userFacade.getUserByEmail(principal.getName());
    }


    @PreAuthorize("hasAuthority('read')")
    @GetMapping()
    public UserRsDto findUserByEmail(
            @RequestParam("email") String email) {
        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new NoDataFoundException("no User found by this email")); //https://habr.com/ru/post/346782/
        return userFacade.convertToDto(user);
    }


    //    @PreAuthorize("hasAuthority('read')")
    @GetMapping("/all")
    public List<UserRsDto> findAll() {
        return userService.findAll().stream().map(userFacade::convertToDto).collect(Collectors.toList());
    }

    // запускать на:  http://localhost:8000/api/v1/users/1/test
    @GetMapping("/{id}/test")
    public void test(@PathVariable("id") Long id){
        UserDatingProfile userDatingProfileSelector = findUserDatingProfileEntityById(id);
        findAllByCriteria(userDatingProfileSelector);
    }


    public void findAllByCriteria(UserDatingProfile userDatingProfileSelector) {
        System.out.println("in findAllByCriteria, userDatingProfileSelector: " + userDatingProfileSelector);
        EntityManager em = entityManagerFactory.createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();

        CriteriaQuery<UserDatingProfile> cq = cb.createQuery(UserDatingProfile.class);
        Root<UserDatingProfile> userDatingProfile = cq.from(UserDatingProfile.class);
//        Predicate minAgeCriteria = cb.equal(userDatingProfile.get("birthday"), userDatingProfileSelector.getMinPreferedAge());
//        Predicate maxAgeCriteria = cb.equal(userDatingProfile.get("birthday"), userDatingProfileSelector.getMaxPreferedAge());
//        Predicate lastVisitDateCriteria = cb.equal(userDatingProfile.get("????"), userDatingProfileSelector.getMaxPreferedAge());
        Predicate sexCriteria = cb.equal(userDatingProfile.get("mySex"), userDatingProfileSelector.getSeekAPersonOfSex());
        Predicate minHeightCriteria = cb.greaterThanOrEqualTo(userDatingProfile.get("myHeight"), userDatingProfileSelector.getMinHeightIWant());
        Predicate maxHeightCriteria = cb.lessThanOrEqualTo(userDatingProfile.get("myHeight"), userDatingProfileSelector.getMaxHeightIWant());
        Predicate countryCriteria = cb.equal(userDatingProfile.get("countryINowLiveIn"), userDatingProfileSelector.getWantFromCountry());
        Predicate childrenCriteria = cb.lessThanOrEqualTo(userDatingProfile.get("numberOfMyChildren"), userDatingProfileSelector.getMaxNumberOfChildrenAllowed());

        List<Predicate> predicates = new ArrayList<>();
        predicates.add(sexCriteria);
        if(userDatingProfileSelector.getMinHeightIWant() > 100){
            predicates.add(minHeightCriteria);
//            System.out.println("added Predicate: minHeightCriteria");
        }
        if(userDatingProfileSelector.getMaxHeightIWant() > 150){
            predicates.add(maxHeightCriteria);
//            System.out.println("added Predicate: maxHeightCriteria");
        }        if(userDatingProfileSelector.getMaxNumberOfChildrenAllowed() < 100){
            predicates.add(childrenCriteria);
//            System.out.println("added Predicate: childrenCriteria");
        }
        cq.where(predicates.toArray(new Predicate[predicates.size()]));

//        cq.where(sexCriteria, minHeightCriteria, maxHeightCriteria, childrenCriteria);
        List<UserDatingProfile> selectedUsers = em.createQuery(cq).getResultList();
        System.out.println("selectedUsers: " + selectedUsers);
        List<Long> ids = selectedUsers.stream().map(UserDatingProfile::getId).collect(Collectors.toList());
//        System.out.println("List<userIds>: " + ids);
    }
}
