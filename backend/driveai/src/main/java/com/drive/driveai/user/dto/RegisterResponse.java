package com.drive.driveai.user.dto;

import java.util.UUID;

import lombok.Data;

@Data
public class RegisterResponse {
    private UUID userId;
    private String fullName;
    private String email;
    
}
