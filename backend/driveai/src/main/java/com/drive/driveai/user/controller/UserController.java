package com.drive.driveai.user.controller;




import java.net.Authenticator;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.drive.driveai.security.CustomUserDetails;
import com.drive.driveai.user.dto.CurrentUserResponse;
import com.drive.driveai.user.service.UserService;
@RestController
@RequestMapping("/users")
public class UserController {
    
    private final UserService userService;
  
    
    public UserController(UserService userService) {
        this.userService = userService;
    }

   
    
    @GetMapping("/hello")
    public String hello() {
        return "Authenticated!";
    }
    @GetMapping("/me")
    public ResponseEntity<CurrentUserResponse> getCurrentUser(
        @AuthenticationPrincipal CustomUserDetails user){

       return ResponseEntity.ok(userService.getCurrentUser(user.getId()));
    }


}
