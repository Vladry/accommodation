package com.hub.accommodation.aws.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;


//этот класс нужен для создания в target/classes/META-INF/spring-configuration-metadata.js
//json - структуры плейсхолдеров, которые затем будут использоваться для задания значений в
//файле yaml
// задачу можно выполнить либо с помощью record(){} (в java 17), либо классичеким классом с аннотацией @Value lombok (для java-11)


@ConfigurationProperties("aws") cd- чтобы активировать, добавить в AccommodationApplication аннотацию: //@EnableConfigurationProperties(KeysPasswordsConfig.class)  // --для AWS
//либо record (java 17):
public record KeysPasswordsConfig(String accessKeyId, String accessSecretKey){};

//либо обычно (java 11):

//@Value
//@Accessors(fluent=true)
//public class KeysPasswordsConfig {
//    public String accessKeyId;
//    public String accessSecretKey;
//}
