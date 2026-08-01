package com.drive.driveai.file.dto;

import java.io.InputStream;

import lombok.Data;

@Data
public class DownloadFileResponse {
    
    private InputStream inputStream; 
    private String originalFileName;
    private String contentType;

    
    
    
}
