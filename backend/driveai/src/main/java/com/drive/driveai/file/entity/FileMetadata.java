package com.drive.driveai.file.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import com.drive.driveai.file.enums.FileStatus;
import com.drive.driveai.user.entity.User;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="file_metadata")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FileMetadata extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String originalFileName;
    private String storageKey;
    private String contentType;
    private Long fileSize;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="uploaded_by",nullable = false)
    private User uploadedBy;

    @Enumerated(EnumType.STRING)
    private FileStatus status;
    
}
