package com.drive.driveai.file.controller;

import java.util.UUID;

import com.drive.driveai.file.dto.DownloadFileResponse;
import com.drive.driveai.file.dto.FileResponse;
import com.drive.driveai.file.dto.RenameFileRequest;
import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import lombok.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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


import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/files")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;
    @PostConstruct
    public void init() {
        System.out.println("🔥 FILE CONTROLLER LOADED");
    }
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

    // download endpoint
    @GetMapping("/download/{fileId}")
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

// delete endpoint
    @DeleteMapping("/delete/{fileId}")
    public ResponseEntity<Void> deleteFile(@PathVariable UUID fileId,Authentication authentication){
        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();

        fileService.deleteFile(fileId,user.getUser().getId());
        return  ResponseEntity.noContent().build();

    }

    // delete permanently
    @DeleteMapping("/delete/{fileId}/permanent")
    public ResponseEntity<Void>  permanentlyDeleteFile(@PathVariable UUID fileId,Authentication authentication){
        CustomUserDetails userDetails = (CustomUserDetails)  authentication.getPrincipal();

        fileService.permanentlyDeleteFile(fileId,userDetails.getUser().getId());
        return ResponseEntity.noContent().build();
    }
    // get all files
    @GetMapping
    public ResponseEntity<Page<FileResponse>> getMyFiles(Pageable pageable,Authentication authentication){
        CustomUserDetails user = (CustomUserDetails)  authentication.getPrincipal();
        UUID currentUserId = user.getUser().getId();
        Page<FileResponse> response = fileService.getMyFiles(currentUserId,pageable);
        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }
    // rename
    @PatchMapping("/rename/{fileId}")
    public ResponseEntity<FileResponse> renameFile(@PathVariable UUID fileId,@Valid @RequestBody RenameFileRequest request, Authentication authentication){
        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();
        UUID currentUserId = user.getUser().getId();

        FileResponse response = fileService.renameFile(fileId,currentUserId,request);
        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

    // get trash files
    @GetMapping("/trash")
    public ResponseEntity<Page<FileResponse>> getTrashFiles(Authentication authentication,Pageable pageable){
        CustomUserDetails user = (CustomUserDetails)  authentication.getPrincipal();

        Page<FileResponse>  response = fileService.getTrashFiles(user,pageable);
        return  ResponseEntity.ok(response);
    }


    // restore

    @PatchMapping("/restore/{fileId}")
        public ResponseEntity<Void>  restoreFile(@PathVariable UUID fileId,Authentication authentication){

        CustomUserDetails  user = (CustomUserDetails)  authentication.getPrincipal();

        fileService.restoreFile(fileId,user.getUser().getId());
        return ResponseEntity.noContent().build();

    }

  // search files
    @GetMapping("/search")
    public ResponseEntity<Page<FileResponse>> searchFiles(Authentication authentication,@RequestParam String searchText ,Pageable pageable){
        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();
        Page<FileResponse>  response = fileService.searchFiles(user.getUser().getId(),searchText,pageable);
        return ResponseEntity.ok(response);
    }

    // favorite
    @PutMapping("/{fileId}/favorite")
    public ResponseEntity<Void> favoriteFile(@PathVariable UUID fileId,Authentication authentication){
        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();
        fileService.favoriteFile(fileId,user.getUser().getId());
        return ResponseEntity.noContent().build();
    }


    // Un favorite file
    @DeleteMapping("/{fileId}/favorite")
    public  ResponseEntity<Void> unFavoriteFile(@PathVariable UUID fileId, Authentication authentication){
        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();
        fileService.unFavoriteFile(fileId,user.getUser().getId());
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/favorites")
    public ResponseEntity<Page<FileResponse>> getFavoriteFiles(Authentication authentication,Pageable pageable){
        CustomUserDetails user = (CustomUserDetails)  authentication.getPrincipal();
        Page<FileResponse> response = fileService.getFavoriteFiles(user.getUser(),pageable);

        return ResponseEntity.ok(response);
    }


    // recent files

    @GetMapping("/recent")
    public ResponseEntity<Page<FileResponse>> getRecentFiles(Authentication authentication,Pageable pageable){
        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();
        Page<FileResponse> response = fileService.getRecentFiles(user.getUser(),pageable);
        return ResponseEntity.ok(response);
    }
}
