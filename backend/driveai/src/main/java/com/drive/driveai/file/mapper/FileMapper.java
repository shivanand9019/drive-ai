package com.drive.driveai.file.mapper;

import org.springframework.stereotype.Component;


import com.drive.driveai.file.dto.UploadFileResponse;
import com.drive.driveai.file.entity.FileMetadata;
import com.drive.driveai.file.enums.FileStatus;
import com.drive.driveai.user.entity.User;

@Component
public class FileMapper {

    public FileMetadata mapToEntity(String originalFilename, String contentType, Long fileSize, String storageKey,
            User user) {

        FileMetadata fileMetadata = new FileMetadata();
        fileMetadata.setOriginalFileName(originalFilename);
        fileMetadata.setStorageKey(storageKey);
        fileMetadata.setContentType(contentType);
        fileMetadata.setFileSize(fileSize);
        fileMetadata.setUploadedBy(user);
        fileMetadata.setStatus(FileStatus.UPLOADED);
        return fileMetadata;

    }

    public UploadFileResponse mapToResponse(FileMetadata fileMetadata) {
        UploadFileResponse response = new UploadFileResponse();
        response.setId(fileMetadata.getId());
        response.setOriginalFileName(fileMetadata.getOriginalFileName());
        response.setContentType(fileMetadata.getContentType());
        response.setFileSize(fileMetadata.getFileSize());
        response.setStatus(fileMetadata.getStatus());
        return response;

    }
}
