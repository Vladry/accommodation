package com.hub.accomodation.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User extends AbstractEntity {

    @NotNull
    @Size(min = 3, message = "Имя не может быть короче 3х символов!")
    private String name;
    @NotNull
    private String lastName;
    @NotNull
    @Pattern(regexp = "(\\+38|0)[0-9]{9}]")
    private String phoneNumber;
    @Email
    private String email;
    @NotNull
    private String authorizationOrPassword;
    private String telegramOrViberOrInstagram;
    private String URL_FacebookOrLinkedInOrOther;





}
