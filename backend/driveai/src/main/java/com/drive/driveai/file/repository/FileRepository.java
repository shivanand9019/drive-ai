package com.drive.driveai.file.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.drive.driveai.file.entity.FileMetadata;
import com.drive.driveai.user.entity.User;

@Repository
public interface FileRepository extends JpaRepository<FileMetadata,UUID>{

    Optional<FileMetadata> findByIdAndDeletedAtIsNull(UUID fileId);

    Page<FileMetadata> findByUploadedByIdAndDeletedAtIsNull(UUID userId, Pageable pageable);

    List<FileMetadata> findByUploadedByAndDeletedAtIsNull(User user );


    
}
