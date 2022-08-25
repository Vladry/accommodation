package com.hub.accommodation.zonedDateTime_Converters;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class ZonedDateTimeSerializer extends JsonSerializer<ZonedDateTime> {

    @Override
    public void serialize(ZonedDateTime dateTime, JsonGenerator generator, SerializerProvider provider)
            throws IOException {

        String dateTimeString = dateTime.format(
                DateTimeFormatter
                        .ISO_INSTANT
                        .withZone(ZoneId.systemDefault()));
        generator.writeString(dateTimeString);
    }
}
