package com.hub.accommodation.config;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;


@Configuration
public class JacksonConfig {

    @Autowired
    private ObjectMapper objectMapper;

    @PostConstruct
    private void configureObjectMapper() {
        // новый способ нихера не работает:
        JsonMapper
                .builder()
                .serializationInclusion(JsonInclude.Include.NON_EMPTY)
                .configure(MapperFeature.DEFAULT_VIEW_INCLUSION, true)
                .build();


        // а deprecated работает:
        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_EMPTY);
        objectMapper.configure(MapperFeature.DEFAULT_VIEW_INCLUSION, true);
    }
}
