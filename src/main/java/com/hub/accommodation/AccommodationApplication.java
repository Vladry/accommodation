package com.hub.accommodation;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.websocket.Session;
import java.time.ZoneId;
import java.util.TimeZone;


@SpringBootApplication
@EnableJpaAuditing
@EnableTransactionManagement
public class AccommodationApplication implements ApplicationRunner {

    public static void main(String[] args) {
        SpringApplication.run(AccommodationApplication.class, args);
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("ZoneId.systemDefault(): " + ZoneId.systemDefault());
    }

}
