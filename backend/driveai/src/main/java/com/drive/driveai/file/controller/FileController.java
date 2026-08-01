package com.drive.driveai.file.controller;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.drive.driveai.file.dto.UploadFileResponse;
import com.drive.driveai.file.service.FileService;
import com.drive.driveai.security.CustomUserDetails;
import com.drive.driveai.security.CustomUserDetailsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/files")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;
   
    @PostMapping("/upload")
    public ResponseEntity<UploadFileResponse> upload(
        @RequestParam("file") MultipartFile file,
        Authentication authentication
    ){

        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();
        UUID userId = user.getUser().getId();

        UploadFileResponse response = fileService.uploadFile(file, userId);
        return ResponseEntity.status(HttpStatus.CREATED)
                                .body(response);


    }
    
}
