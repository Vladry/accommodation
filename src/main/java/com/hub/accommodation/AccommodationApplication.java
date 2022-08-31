package com.hub.accommodation;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hub.accommodation.DTO.request.UserDatingProfileRqDto;
import com.hub.accommodation.domain.accommodation.enums.Country;
import com.hub.accommodation.domain.user.Goals;
import com.hub.accommodation.domain.user.UserDatingProfile;
import com.hub.accommodation.domain.user.enums.Interests;
import com.hub.accommodation.domain.user.enums.Sex;
import com.hub.accommodation.service.UserDatingProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.SpringVersion;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import java.io.File;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;


@SpringBootApplication
@EnableTransactionManagement
public class AccommodationApplication implements ApplicationRunner {

    public static void cls() {
        try {
            new ProcessBuilder("cmd", "/c", "cls").inheritIO().start().waitFor();
        } catch (Exception E) {
            System.out.println(E.getMessage());
        }
    }

    public static void main(String[] args) {
        System.out.println("my App 'Accommodation' is using the Spring version: " + SpringVersion.getVersion());
        SpringApplication.run(AccommodationApplication.class, args);
    }

    @Autowired
    UserDatingProfileService userDatingProfileService;

    @PersistenceUnit
    EntityManagerFactory emf;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("ZoneId.systemDefault(): " + ZoneId.systemDefault());
        List<UserDatingProfile> udps = new ArrayList<>();
        udps.add(new UserDatingProfile(1L,  Sex.F, LocalDate.parse("1965-01-14"), LocalDateTime.now(), Sex.M, 170, 190, 198, 18, 30, Country.USA, Country.UKRAINE, Country.USA, 1, 0, "nothing to say", "tall height", "smoking", null, null, null, null));
        udps.add(new UserDatingProfile(2L,  Sex.F, LocalDate.parse("1996-08-09"), LocalDateTime.now(), Sex.M, 163, 0,   198, 18, 30, Country.CANADA, Country.UKRAINE, Country.CHINA, 2, 0, "nothing to say", null, null, null, null,  new ArrayList<>(List.of(Goals.MAKING_FRIENDS_ONLY , Goals.SPONSORSHIP_BASED_RELATIONSHIP)), null));
        udps.add(new UserDatingProfile(3L,  Sex.M, LocalDate.parse("2022-06-23"), LocalDateTime.now(), Sex.F, 193, 160,   0, 18, 30, Country.USA, Country.UKRAINE, Country.USA, 2, 0, "nothing to say",  "kindness, loving", "flatter",  new ArrayList<>(List.of(Interests.CARS, Interests.CHILDREN)), null, null, null));
        udps.add(new UserDatingProfile(4L,  Sex.M, LocalDate.parse("1985-01-03"), LocalDateTime.now(), Sex.F, 170, 0,     0, 18, 30, Country.UKRAINE, Country.UKRAINE, Country.UKRAINE, 2, 100, "nothing to say", null, null, null,  new ArrayList<>(List.of(Interests.CARS, Interests.CHILDREN)),  new ArrayList<>(List.of(Goals.WANTED_WITH_SIMILAR_INTERESTS)), null));
        udps.add(new UserDatingProfile(5L,  Sex.F, LocalDate.parse("2022-06-23"), LocalDateTime.now(), Sex.M, 160, 180, 198, 18, 30, Country.SLOVAKIA, Country.UKRAINE, Country.SLOVAKIA, 0, 0, "nothing to say", "cant recall", "grid", null, null, null, null));
        udps.add(new UserDatingProfile(17L, Sex.M, LocalDate.parse("1983-11-20"), LocalDateTime.now(), Sex.F, 183, 160, 178, 18, 30, Country.USA, Country.UKRAINE, Country.NETHERLANDS, 1, 0, "nothing to say", null, null, null,  new ArrayList<>(List.of(Interests.ANIME, Interests.BOATING)),  new ArrayList<>(List.of(Goals.TO_BUILD_FAMILY_WITH_CHILDREN, Goals.JOINT_RENT_OF_APARTMENT)), null));
        udps.add(new UserDatingProfile(18L, Sex.M, LocalDate.parse("1989-09-01"), LocalDateTime.now(), Sex.F, 173, 159, 188, 18, 30, Country.USA, Country.UKRAINE, Country.AUSTRALIA, 1, 0, "nothing to say", "caring, love", "arrogance", null, null, null, null));
        udps.add(new UserDatingProfile(19L, Sex.M, LocalDate.parse("1973-05-13"), LocalDateTime.now(), Sex.F, 173, 150, 190, 16, 50, Country.USA, Country.UKRAINE, Country.SLOVAKIA, 1, 5, "nothing to say", null, "short height",  new ArrayList<>(List.of(Interests.BICYCLES, Interests.IT_COMPUTERS)),  new ArrayList<>(List.of(Interests.CARS, Interests.FISHING)), new ArrayList<>(List.of(Goals.I_AM_JUST_BORED, Goals.JOINT_RENT_OF_APARTMENT)), null));

        udps.forEach(udp-> userDatingProfileService.save(udp));


        // Пример кода для считывания JSON стоки в java- сущность:
/*
        ObjectMapper mapper = new ObjectMapper();
        UserDatingProfileRqDto udpRqDto = mapper.readValue(
                new File("src/main/resources/test.json"), UserDatingProfileRqDto.class);
        System.out.println("converted from JSON udpRsDto: " + udpRqDto);
*/


    }

}
