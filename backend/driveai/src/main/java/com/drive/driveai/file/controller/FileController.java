package com.drive.driveai.file.controller;

import java.util.UUID;

import com.drive.driveai.file.dto.DownloadFileResponse;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
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
    @GetMapping("/{fileId}")
    public ResponseEntity<InputStreamResource> downloadFile(@PathVariable UUID fileId,Authentication authentication){
        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();
        UUID userId = user != null ? user.getUser().getId() : null;
        DownloadFileResponse response = fileService.downloadFile(fileId,userId);
        InputStreamResource resource  = new InputStreamResource(response.getInputStream());

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(response.getContentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION,"attachment; filename=\""+response.getOriginalFileName()+"\"")
                .body(resource);
    }

    
    
}
