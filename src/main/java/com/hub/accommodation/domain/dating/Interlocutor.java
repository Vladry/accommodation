package com.hub.accommodation.domain.dating;

import lombok.Data;

@Data
public class Interlocutor {

    private Long userId;
    private String avatar;
    private String nick;
    private Boolean blacklisted;

    public Interlocutor(Long id, String avatar, String name, String lastName){
        this.userId = id;
        this.avatar = avatar;
        this.nick = name + " " + lastName;
    }

    @Override
    public String toString(){
        return "Interlocutor: id= " + this.userId;
    }
}
