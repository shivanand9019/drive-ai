package com.drive.driveai.file.dto;

import com.drive.driveai.file.entity.BaseEntity;
import com.drive.driveai.file.enums.FileStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class FileResponse extends BaseEntity {

    private UUID id;

    private String originalFileName;

    private String contentType;

    private Long fileSize;

    private FileStatus status;

    private LocalDateTime uploadedAt;

}