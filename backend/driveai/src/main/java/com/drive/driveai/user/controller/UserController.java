package com.drive.driveai.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.drive.driveai.user.dto.LoginRequest;
import com.drive.driveai.user.dto.LoginResponse;
import com.drive.driveai.user.dto.RegisterRequest;
import com.drive.driveai.user.dto.RegisterResponse;
import com.drive.driveai.user.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    
    private final UserService userService;
    
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")

    ResponseEntity<RegisterResponse> registerUser(@Valid @RequestBody RegisterRequest request) {
        // Implementation for user registration
        RegisterResponse response = userService.registerUser(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
                
    }

    @PostMapping("/login")
    ResponseEntity<LoginResponse> loginUser(@Valid @RequestBody LoginRequest request){
        LoginResponse response = userService.loginUser(request);
        return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(response);
        
    }
}


// git checkout feature/user-registration

// git add .

// git commit -m "feat(user): complete user registration"

// git tag -a v0.1.0 -m "User registration completed"

// git push origin feature/user-registration

// git push origin v0.1.0