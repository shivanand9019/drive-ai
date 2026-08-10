package com.drive.driveai.file.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.drive.driveai.file.enums.FileStatus;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import lombok.Data;

@Data
public class UploadFileResponse {
    private UUID id;
    private String originalFileName;
    private String contentType;
    private Long fileSize;

   

    @Enumerated(EnumType.STRING)
    private FileStatus status;
}
