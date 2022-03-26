package com.hub.accommodation.controller;

import com.hub.accommodation.service.JwtService;
import com.hub.accommodation.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@AllArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final JwtService jwt;

//@PostMapping("/login")
//    public LoginRs handleLogin(@RequestBody LoginRq rq){
//    log.info(rq);
//
//    return null;
//}
}
