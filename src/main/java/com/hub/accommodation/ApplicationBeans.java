package com.hub.accommodation;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.h2.tools.Server;   //чтобы server прописался -в pom.xml нужно отключить <scope> в настройке h2
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.auditing.DateTimeProvider;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.time.ZonedDateTime;
import java.util.Optional;


@Configuration
    public class ApplicationBeans {

        //этот бин - костыль, нужен для правильной работы h2
        @Profile("local")
        @Bean
        Server h2Server() {
            Server server = new Server();
            try {
                server.runTool("-tcp");
                server.runTool("-tcpAllowOthers");
            } catch (Exception e) {
                e.printStackTrace();
            }
            return server;
        }


    @Bean
    public OpenAPI springShopOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("myApp API")
                        .description("Accommodation Endpoints Information")
                        .version("v0.0.1")
                        .license(new License().name("Apache 2.0").url("http://springdoc.org"))
                        .description("SpringShop Wiki Documentation")
                        .contact(new Contact().email("rvy@ukr.net").url("http://localhost:3000")));
    }

}


