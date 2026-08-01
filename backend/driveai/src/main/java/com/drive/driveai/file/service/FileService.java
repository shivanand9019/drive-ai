package com.drive.driveai.file.service;

import java.io.InputStream;
import java.util.Set;
import java.util.UUID;

import com.drive.driveai.exception.FileMetadataNotFoundException;
import com.drive.driveai.file.dto.DownloadFileResponse;
import io.minio.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.drive.driveai.exception.FileStorageException;
import com.drive.driveai.exception.InvalidFileException;
import com.drive.driveai.file.dto.UploadFileResponse;
import com.drive.driveai.file.entity.FileMetadata;
import com.drive.driveai.file.mapper.FileMapper;
import com.drive.driveai.file.repository.FileRepository;
import com.drive.driveai.user.entity.User;
import com.drive.driveai.user.repository.UserRepository;


@Service

public class FileService {

    private final MinioClient minioClient;
    private final UserRepository userRepository;
    private final FileMapper mapper;

    private final FileRepository fileRepository;
    public FileService(MinioClient minioClient, UserRepository userRepository, FileMapper mapper, FileRepository fileRepository) {
        this.minioClient = minioClient;
        this.userRepository = userRepository;
        this.mapper = mapper;
        this.fileRepository = fileRepository;
    }

    @Value("${app.file.max-size}")
    private long maxFileSize;
    @Value("${minio.bucket}")
    private String bucket;
    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of(
            "image/png",
            "image/jpeg",
            "image/jpg",
            "application/pdf");

    public UploadFileResponse uploadFile(MultipartFile file, UUID userId) {
        validateFile(file);
        enusureBucketExists();
        String storageKey = generateStorageKey(file, userId);

        uploadTominio(file, storageKey);

        User user = getUser(userId);

        FileMetadata metadata = mapper.mapToEntity(

                file.getOriginalFilename(),
                file.getContentType(),
                file.getSize(),
                storageKey,
                user);

        metadata = fileRepository.save(metadata);
        return mapper.mapToResponse(metadata);

    }

    private void validateFile(MultipartFile file) {
        // null check
        if (file == null) {
            throw new InvalidFileException("No file provided.");
        }

        if (file.isEmpty())
            throw new InvalidFileException("Uploaded file is empty.");

        if (file.getSize() > maxFileSize) {
            throw new InvalidFileException("File exceeds maximum allowed size.");
        }

        if (!ALLOWED_CONTENT_TYPES.contains(file.getContentType())) {
            throw new InvalidFileException("Unsupported file type.");
        }

    }

    private void enusureBucketExists() {

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

    private String generateStorageKey(MultipartFile file, UUID userId) {

        String fileName = file.getOriginalFilename();

        if (fileName == null || fileName.isBlank()) {
            throw new InvalidFileException("Invalid file Name");
        }
        int index = fileName.lastIndexOf('.');
        if (index == -1) {
            throw new InvalidFileException("File has no extension");
        }

        String extension = fileName.substring(index + 1);

        String storageKey = "users/"
                + userId
                + "/"
                + UUID.randomUUID()
                + "." + extension;

        return storageKey;
    }

    private void uploadTominio(MultipartFile file, String storageKey) {
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

    private User getUser(UUID userId) {
        User user = userRepository.findByIdAndDeletedAtIsNull(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User Not found"));
        return user;
    }

    public DownloadFileResponse downloadFile(UUID fileId,UUID currentUserId){
        FileMetadata fileMetadata = fileRepository
                .findByIdAndDeletedAtIsNull(fileId)
                .orElseThrow(()-> new FileMetadataNotFoundException("File Not Found with id:"+fileId));

        if(!(fileMetadata.getUploadedBy().getId().equals(currentUserId))){
            throw new AccessDeniedException("You are not authorized to access this file");

        }

        try {
            InputStream inputStream= minioClient.getObject(
                    GetObjectArgs.builder()
                            .bucket(bucket)
                            .object(fileMetadata.getStorageKey())
                            .build()
            );
            return mapper.mapToDownloadFileResponse(inputStream,fileMetadata.getOriginalFileName(),fileMetadata.getContentType());
        } catch (Exception e) {
            throw  new FileStorageException("Unable to download file from MinIO.",e);
        }



    }


}
