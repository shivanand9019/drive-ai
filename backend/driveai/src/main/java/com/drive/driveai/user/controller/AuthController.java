package com.drive.driveai.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.drive.driveai.user.dto.LoginRequest;
import com.drive.driveai.user.dto.LoginResponse;
import com.drive.driveai.user.dto.RegisterRequest;
import com.drive.driveai.user.dto.RegisterResponse;
import com.drive.driveai.user.service.AuthenticationService;
import com.drive.driveai.user.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;
    private final UserService userService;
   

     @PostMapping("/register")
    ResponseEntity<RegisterResponse> registerUser(@Valid @RequestBody RegisterRequest request) {
        // Implementation for user registration
        RegisterResponse response = userService.registerUser(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
                
    }
    // Implementaion for user login
    @PostMapping("/login")
    public LoginResponse login(@ RequestBody LoginRequest request){
        return authenticationService.login(request);
        
    }
    
}
    

