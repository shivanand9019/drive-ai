package com.drive.driveai.file.repository;

import com.drive.driveai.file.entity.FileMetadata;
import com.drive.driveai.file.entity.FileShare;
import com.drive.driveai.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface FileShareRepository extends JpaRepository<FileShare, UUID> {
    boolean existsByFileAndSharedWith(FileMetadata file, User sharedWith);

    Page<FileShare> findBySharedWithAndDeletedAtIsNull(User sharedWith, Pageable pageable);
}
