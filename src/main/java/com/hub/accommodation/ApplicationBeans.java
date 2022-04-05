package com.hub.accommodation;

import org.h2.tools.Server;   //чтобы server прописался -в pom.xml нужно отключить <scope> в настройке h2
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;


    @Configuration
    public class ApplicationBeans {

        //этот бин-надо исключительно для правильной работы h2
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
}
