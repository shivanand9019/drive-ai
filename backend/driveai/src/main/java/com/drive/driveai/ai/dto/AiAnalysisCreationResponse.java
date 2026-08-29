package com.drive.driveai.ai.dto;

import com.drive.driveai.ai.enums.AiStatus;
import com.drive.driveai.file.entity.FileMetadata;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AiAnalysisCreationResponse {

    private FileMetadata file;
    private AiStatus status;
}
