package com.drive.driveai.ai.entity;

import com.drive.driveai.ai.enums.AiStatus;
import com.drive.driveai.file.entity.BaseEntity;
import com.drive.driveai.file.entity.FileMetadata;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AiAnalysis extends BaseEntity {



    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "file_id")
    private FileMetadata file;
    private String summary;
    private double processingTime;
    private AiStatus status;


}
