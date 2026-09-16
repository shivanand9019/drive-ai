package com.drive.driveai.file.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.drive.driveai.file.service.DashboardService;
import com.drive.driveai.security.CustomUserDetails;


import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {


    private final DashboardService dashboardService;
    @GetMapping("/data")
    public ResponseEntity<?> getDashboardData(Authentication authentication) {
        CustomUserDetails currentUser = (CustomUserDetails) authentication.getPrincipal();
        return ResponseEntity.ok(dashboardService.getDashboardData(currentUser.getId()));

    }

    
}
