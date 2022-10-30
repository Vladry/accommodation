package com.hub.accommodation;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hub.accommodation.config.KeysPasswordsConfig;
import com.hub.accommodation.domain.accommodation.enums.Country;
import com.hub.accommodation.domain.user.Goals;
import com.hub.accommodation.domain.user.UserDatingProfile;
import com.hub.accommodation.domain.user.Interests;
import com.hub.accommodation.domain.user.enums.Sex;
import com.hub.accommodation.dto.request.UserDatingProfileRqDto;
import com.hub.accommodation.service.UserDatingProfileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.core.SpringVersion;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import java.io.File;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@SpringBootApplication
@EnableTransactionManagement
@EnableConfigurationProperties(KeysPasswordsConfig.class)
public class AccommodationApplication implements ApplicationRunner {

    public static void cls() {
        try {
            new ProcessBuilder("cmd", "/c", "cls").inheritIO().start().waitFor();
        } catch (Exception E) {
            log.error(E.getMessage());
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
//        System.out.println("ZoneId.systemDefault(): " + ZoneId.systemDefault());
        List<UserDatingProfile> udps = new ArrayList<>();

        udps.add(new UserDatingProfile(1L,  Sex.F, LocalDate.parse("1965-01-14"),     /*ZonedDateTime.now(),*/ Sex.M, 170, 190, 198, 18, 30, Country.USA, Country.USA, Country.USA, 1, 1, "nothing to say", "tall height", "smoking", null, null, null, null));
        udps.add(new UserDatingProfile(2L,  Sex.M, LocalDate.parse("1996-08-09"),     /*ZonedDateTime.now(),*/ Sex.ANY, 175, 0,   168, 18, 50, Country.CANADA, Country.UKRAINE, Country.CHINA, 2, 3, "romance is my all", null, null, null, null,  new ArrayList<>(List.of(Goals.JOINT_RENT_OF_APARTMENT , Goals.SPONSORSHIP_WANTED)), null));
        udps.add(new UserDatingProfile(3L,  Sex.M, LocalDate.parse("1986-06-23"),     /*ZonedDateTime.now(),*/ Sex.F, 163, 160,   0, 18, 30, Country.ESTONIA, Country.ESTONIA, Country.CANADA, 0, 0, "nothing to say",  "kindness, loving", "flatter",  new ArrayList<>(List.of(Interests.CARS, Interests.CHILDREN)), null, null, null));
        udps.add(new UserDatingProfile(4L,  Sex.OTHER, LocalDate.parse("1985-01-03"), /*ZonedDateTime.now(),*/ Sex.F, 170, 0,     0, 18, 30, Country.UKRAINE, Country.UKRAINE, Country.UKRAINE, 2, 100, "I love playboy", null, null, null,  new ArrayList<>(List.of(Interests.CARS, Interests.CHILDREN)),  new ArrayList<>(List.of(Goals.WANTED_WITH_SIMILAR_INTERESTS)), null));
        udps.add(new UserDatingProfile(5L,  Sex.F, LocalDate.parse("1990-06-23"),     /*ZonedDateTime.now(),*/ Sex.M, 160, 180, 198, 18, 30, Country.SLOVAKIA, Country.UKRAINE, Country.SLOVAKIA, 0, 2, "nothing to say", "cant recall", "grid", null, null, null, null));
        udps.add(new UserDatingProfile(6L,  Sex.F, LocalDate.parse("1983-11-20"),     /*ZonedDateTime.now(),*/ Sex.M, 183, 160, 178, 18, 30, Country.USA, Country.USA, Country.NETHERLANDS, 3, 3, "porn", null, null, null,  new ArrayList<>(List.of(Interests.ANIME, Interests.BOATING)),  new ArrayList<>(List.of(Goals.FAMILY_NO_BIRTH_OF_CHILDREN, Goals.JOINT_RENT_OF_APARTMENT)), null));
        udps.add(new UserDatingProfile(7L,  Sex.F, LocalDate.parse("1989-09-01"),     /*ZonedDateTime.now(),*/ Sex.ANY, 178, 159, 188, 18, 30, Country.USA, Country.USA, Country.AUSTRALIA, 1, 0, "nothing to say", "cats, love", "arrogance", null, null, null, null));
        udps.add(new UserDatingProfile(8L,  Sex.M, LocalDate.parse("1990-09-01"),     /*ZonedDateTime.now(),*/ Sex.F, 173, 159, 188, 18, 30, Country.SINGAPORE, Country.UKRAINE, Country.AUSTRALIA, 1, 0, "I love playboy", "caring, sky", "arrogance", null, null, null, null));
        udps.add(new UserDatingProfile(9L,  Sex.F, LocalDate.parse("1975-09-01"),     /*ZonedDateTime.now(),*/ Sex.M, 188, 159, 188, 18, 30, Country.CANADA, Country.CANADA, Country.CANADA, 3, 2, "romance is my all", "dogs, love", "arrogance", null, null, null, null));
        udps.add(new UserDatingProfile(10L, Sex.OTHER, LocalDate.parse("1969-09-01"), /*ZonedDateTime.now(),*/ Sex.F, 173, 159, 188, 18, 30, Country.USA, Country.UKRAINE, Country.AUSTRALIA, 1, 3, "nothing to say", "caring, love", "arrogance", null, null, null, null));
        udps.add(new UserDatingProfile(11L, Sex.M, LocalDate.parse("1989-09-01"),     /*ZonedDateTime.now(),*/ Sex.F, 153, 159, 188, 18, 30, Country.SINGAPORE, Country.UKRAINE, Country.AUSTRALIA, 1, 0, "porn", "cats, dogs", "arrogance", null, null, null, null));
        udps.add(new UserDatingProfile(12L, Sex.M, LocalDate.parse("1979-09-01"),     /*ZonedDateTime.now(),*/ Sex.F, 163, 159, 188, 18, 30, Country.USA, Country.UKRAINE, Country.ESTONIA, 0, 1, "I love playboy", "sky, love", "arrogance", null, null, null, null));
        udps.add(new UserDatingProfile(13L, Sex.F, LocalDate.parse("1989-09-01"),     /*ZonedDateTime.now(),*/ Sex.M, 183, 159, 188, 18, 30, Country.UKRAINE, Country.SINGAPORE, Country.CANADA, 1, 2, "porn", "caring, sky", "arrogance", null, null, null, null));
        udps.add(new UserDatingProfile(14L, Sex.M, LocalDate.parse("1983-09-01"),     /*ZonedDateTime.now(),*/ Sex.ANY, 173, 159, 188, 18, 30, Country.USA, Country.UKRAINE, Country.AUSTRALIA, 1, 3, "nothing to say", "dogs, love", "arrogance", null, null, null, null));
        udps.add(new UserDatingProfile(15L, Sex.OTHER, LocalDate.parse("1979-09-01"), /*ZonedDateTime.now(),*/ Sex.F, 168, 159, 188, 18, 30, Country.ESTONIA, Country.UKRAINE, Country.ESTONIA, 0, 0, "I love playboy", "caring, cats", "arrogance", null, null, null, null));
        udps.add(new UserDatingProfile(16L, Sex.F, LocalDate.parse("1963-05-10"),     /*ZonedDateTime.now(),*/ Sex.M, 173, 159, 200, 18, 40, Country.AUSTRALIA, Country.UKRAINE, Country.AUSTRALIA, 3, 2, "romance is my all", "sky, dogs", "arrogance", null, null, null, null));
        udps.add(new UserDatingProfile(17L, Sex.M, LocalDate.parse("1973-05-13"),     /*ZonedDateTime.now(),*/ Sex.F, 178, 159, 188, 18, 30, Country.UKRAINE, Country.CANADA, Country.ESTONIA, 1, 3, "nothing to say", "caring, sky", "arrogance", null, null, null, null));
        udps.add(new UserDatingProfile(18L, Sex.F, LocalDate.parse("1989-09-01"),     /*ZonedDateTime.now(),*/ Sex.ANY, 165, 159, 188, 18, 30, Country.CANADA, Country.CANADA, Country.ESTONIA, 0, 1, "nothing to say", "caring, sky", "arrogance", null, null, null, null));
        udps.add(new UserDatingProfile(19L, Sex.M, LocalDate.parse("1973-05-13"),     /*ZonedDateTime.now(),*/ Sex.F, 173, 165, 190, 16, 50, Country.USA, Country.SLOVAKIA, Country.ANY_COUNTRY, 0, 8, "nothing to say", null, "short height",  new ArrayList<>(),  new ArrayList<>(), new ArrayList<>(), null));


        udps.forEach(udp-> userDatingProfileService.save(udp));


        // Пример кода для считывания JSON стоки в java- сущность:
        ObjectMapper mapper = new ObjectMapper();
        UserDatingProfileRqDto udpRqDto = mapper.readValue(
                new File("src/main/resources/test.json"), UserDatingProfileRqDto.class);
        System.out.println("converted from JSON udpRsDto: " + udpRqDto);


    }

}
