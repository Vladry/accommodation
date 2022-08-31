package com.hub.accommodation.util;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

//@Service
public class JsonToDtoConverter<E>{
    Class<E> clazz;
    ObjectMapper om = new ObjectMapper();

    public JsonToDtoConverter(Class<E> clazz){
        this.clazz = clazz;
    };

    public E doConvert(String jsonVal) {
        try {
            return om.readValue(jsonVal, this.clazz);
        } catch (IOException e) {
            System.out.println("IOException at JsonToDtoConverter.\n" + e.getMessage());
            return null;
        }
    }
}
