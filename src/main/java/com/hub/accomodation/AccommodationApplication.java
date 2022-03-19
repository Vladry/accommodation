package com.hub.accomodation;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManager;


@SpringBootApplication
@EnableJpaAuditing
@EnableTransactionManagement
public class AccommodationApplication implements ApplicationRunner {

    public static void main(String[] args) {
        SpringApplication.run(AccommodationApplication.class, args);
    }


    @Override
    public void run(ApplicationArguments args) throws Exception {

    }
}
