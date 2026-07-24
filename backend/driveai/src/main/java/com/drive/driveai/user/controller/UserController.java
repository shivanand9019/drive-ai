package com.drive.driveai.user.controller;




import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



import com.drive.driveai.user.service.UserService;
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    
    private final UserService userService;
    
    public UserController(UserService userService) {
        this.userService = userService;
    }

   
    @GetMapping("/hello")
    public String hello() {
        return "Authenticated!";
    
}
}