package com.hub.accommodation.config;

import org.h2.tools.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;


@Configuration
    public class ApplicationBeans {
/*
        //этот бин - костыль, нужен для правильной работы h2
        @Profile("local")
        @Bean
        Server h2Server() { //чтобы server прописался -в pom.xml нужно отключить <scope> в настройке h2
            Server server = new Server();
            try {
                server.runTool("-tcp");
                server.runTool("-tcpAllowOthers");
            } catch (Exception e) {
                e.printStackTrace();
            }
            return server;
        }*/



    /*

        // для работы Swagger -a
    @Bean
    public OpenAPI springShopOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("myApp API")
                        .description("Accommodation Endpoints Information")
                        .version("v0.0.1")
                        .license(new License().name("Apache 2.0").url("http://springdoc.org"))
                        .description("SpringShop Wiki Documentation")
                        .contact(new Contact().email("rvy@ukr.net").url("http://localhost:3000")));
    }*/

}


