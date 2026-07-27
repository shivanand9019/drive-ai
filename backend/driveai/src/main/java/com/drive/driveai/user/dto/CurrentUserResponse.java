package com.drive.driveai.user.dto;

import java.util.UUID;

import com.drive.driveai.user.enums.Role;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class CurrentUserResponse {

   

    private UUID id;

    private String fullName;

    private String email;

    private Role role;

    
}