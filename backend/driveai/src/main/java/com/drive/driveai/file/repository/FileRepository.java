package com.drive.driveai.file.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import com.drive.driveai.file.dto.FileResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.JpqlQueryBuilder;
import org.springframework.stereotype.Repository;

import com.drive.driveai.file.entity.FileMetadata;
import com.drive.driveai.user.entity.User;

@Repository
public interface FileRepository extends JpaRepository<FileMetadata,UUID>{

    Optional<FileMetadata> findByIdAndDeletedAtIsNull(UUID fileId);

    Page<FileMetadata> findByUploadedByIdAndDeletedAtIsNull(UUID userId, Pageable pageable);

    Page<FileMetadata> findByUploadedByAndDeletedAtIsNotNull(User user,Pageable pageable );

    Page<FileMetadata> findByUploadedByAndDeletedAtIsNull(
            User user,
            Pageable pageable
    );

    Optional<FileMetadata> findByIdAndDeletedAtIsNotNull(UUID fileId);

    Page<FileMetadata> findByUploadedByAndOriginalFileNameContainingIgnoreCaseAndDeletedAtIsNull(User uploadedBy,String searchText,Pageable pageable);
    
}
