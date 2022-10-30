package com.hub.accommodation.util.zonedDateTime_Converters;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Calendar;
import java.sql.Date;
import java.util.TimeZone;

//@Converter(autoApply = true)
public class ZonedDateTimeConverter implements AttributeConverter<ZonedDateTime, Timestamp> {
    //  https://thorben-janssen.com/jpa-attribute-converter/
    @Override
    public Timestamp convertToDatabaseColumn(ZonedDateTime entityAttribute) {
        System.out.println("in ZonedDateTimeConverter.convertToDatabaseColumn()");
        Instant instant = entityAttribute.toInstant();
        LocalDate localDate = LocalDate.ofInstant(instant, ZoneId.systemDefault());
        Date date = Date.valueOf(localDate);
        return new Timestamp(date.getTime());
    }


    @Override
    public ZonedDateTime convertToEntityAttribute(Timestamp databaseColumn) {
        System.out.println("in ZonedDateTimeConverter.convertToEntityAttribute()");
        if (databaseColumn == null) {
            return null;
        }
        Instant instant = databaseColumn.toInstant();
        ZoneId zoneId = TimeZone.getDefault().toZoneId();
        ZonedDateTime zonedDateTime = ZonedDateTime.ofInstant(instant, zoneId);
        return zonedDateTime;
    }

}
