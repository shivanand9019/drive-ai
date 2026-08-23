package com.drive.driveai.storage;


import com.drive.driveai.exception.FileStorageException;
import io.minio.*;
import io.minio.errors.InsufficientDataException;
import io.minio.errors.InternalException;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.InputStream;



@Service
@RequiredArgsConstructor
public class MinioStorageService {

    private final MinioClient minioClient;



    @Value("${minio.bucket}")
    private String bucket;


    public void ensureBucketExists() {

        // check bucket
        try {

            boolean exists = minioClient.bucketExists(
                    BucketExistsArgs.builder()
                            .bucket(bucket)
                            .build());
            // bucket creation
            if (!exists) {
                minioClient.makeBucket(
                        MakeBucketArgs
                                .builder()
                                .bucket(bucket)
                                .build());
            }
        } catch (Exception e) {
            throw new FileStorageException("Unable to create MinIo bucket", e);
        }
    }


    public  InputStream getFileStream(String storageKey) {
            try{
                InputStream stream = minioClient.getObject(
                        GetObjectArgs.builder()
                                .bucket(bucket)
                                .object(storageKey)
                                .build()
                );
                return stream;
            } catch (Exception e){
                throw new FileStorageException("Failed to access the file",e);

            }

        }
    public void uploadToMinio(MultipartFile file, String storageKey) {
        try (InputStream inputStream = file.getInputStream()) {

            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucket)
                            .object(storageKey)
                            .stream(inputStream, file.getSize(), -1)
                            .contentType(file.getContentType())
                            .build());

        } catch (Exception e) {

            throw new FileStorageException("Unable store in minio", e);

        }

    }

}
