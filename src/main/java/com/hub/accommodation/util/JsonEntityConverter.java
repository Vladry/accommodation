package com.hub.accommodation.util;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.type.ResolvedType;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.lang.reflect.Type;

//@Service
public class JsonEntityConverter <E>{
    Class<E> clazz;
    ObjectMapper om = new ObjectMapper();

    public JsonEntityConverter(Class<E> clazz){
        this.clazz = clazz;
    };

    public E jsonConvert(String jsonVal, Class<E> clazz) {
        try {
            return om.readValue(jsonVal, clazz);
        } catch (IOException e) {
            System.out.println("IOException at JsonEntityConverter" + e.getMessage());
            return null;
        }
    }
}
