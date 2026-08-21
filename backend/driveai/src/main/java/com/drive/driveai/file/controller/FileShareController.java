package com.drive.driveai.file.controller;

import com.drive.driveai.file.dto.FileResponse;
import com.drive.driveai.file.service.FileShareService;
import com.drive.driveai.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


import java.util.UUID;

@RestController
@RequestMapping("/files/share")
@RequiredArgsConstructor
public class FileShareController {

    private final FileShareService fileShareService;
    @PostMapping("/{fileId}")
    public ResponseEntity<Void> shareFile(@PathVariable UUID fileId, Authentication authentication, @RequestParam String recipientEmail){
        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();
        fileShareService.shareFile(
                fileId,
                user.getUser().getId(),
                recipientEmail
        );
        return ResponseEntity.noContent().build();

    }

    @GetMapping()
    public ResponseEntity<Page<FileResponse>> getSharedFiles(Authentication authentication, Pageable pageable){
        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();

       Page<FileResponse> response =  fileShareService.getSharedFiles(user.getUser().getId(),pageable);
       return ResponseEntity.ok(response);
    }
}
