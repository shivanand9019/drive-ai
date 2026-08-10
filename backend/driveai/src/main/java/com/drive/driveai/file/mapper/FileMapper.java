package com.drive.driveai.file.mapper;

import com.drive.driveai.file.dto.DownloadFileResponse;
import com.drive.driveai.file.dto.FileResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;


import com.drive.driveai.file.dto.UploadFileResponse;
import com.drive.driveai.file.entity.FileMetadata;
import com.drive.driveai.file.enums.FileStatus;
import com.drive.driveai.user.entity.User;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    public DownloadFileResponse mapToDownloadFileResponse(InputStream inputStream,String originalFileName,String contentType){
        DownloadFileResponse downloadFileResponse = new DownloadFileResponse();
        downloadFileResponse.setInputStream(inputStream);
        downloadFileResponse.setOriginalFileName(originalFileName);
        downloadFileResponse.setContentType(contentType);
        return downloadFileResponse;


    }
<<<<<<< Updated upstream
    public FileResponse mapToFileResponse(FileMetadata metadata){
        FileResponse response = new FileResponse();
        response.setId(metadata.getId());
        response.setOriginalFileName(metadata.getOriginalFileName());
        response.setFileSize(metadata.getFileSize());
        response.setContentType(metadata.getContentType());
        response.setStatus(metadata.getStatus());
        return response;
=======

    public List<FileResponse> mapToResponse(List<FileMetadata> files) {
      List<FileResponse> responses = new ArrayList<>();


      for (FileMetadata data:files){
          FileResponse res =  new FileResponse();
        res.setId(data.getId());
        res.setOriginalFileName(data.getOriginalFileName());
        res.setContentType(data.getContentType());
        res.setFileSize(data.getFileSize());
        res.setStatus(data.getStatus());
        res.setUploadedAt(data.getUpdatedAt());
          responses.add(res);
      }


      return  responses;

>>>>>>> Stashed changes
    }
   

   
}
