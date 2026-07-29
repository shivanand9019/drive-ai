package com.drive.driveai.file.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.minio.MinioClient;

@Configuration
public class MinioConfig {


   @Value("${minio.endpoint}")
    private String endpoint;

    @Value("${minio.access-Key}")
    private String accessKey;
    
    @Value("${minio.secret-Key}")
    private String secretKey;

    @Value("${minio.bucket}")
    private String bucket;


    @Bean
    public MinioClient minioClient(){
        return MinioClient.builder()
                .endpoint(endpoint)
                .credentials(accessKey, secretKey)
                .build();
        
    }

    
}
