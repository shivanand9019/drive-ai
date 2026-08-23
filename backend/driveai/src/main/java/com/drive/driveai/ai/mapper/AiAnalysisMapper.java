package com.drive.driveai.ai.mapper;

import com.drive.driveai.ai.dto.AiAnalysisCreationResponse;
import com.drive.driveai.ai.entity.AiAnalysis;
import com.drive.driveai.file.entity.FileMetadata;
import org.springframework.stereotype.Component;

@Component
public class AiAnalysisMapper {

   public AiAnalysisCreationResponse mapToAiAnalysisCreationResponse(AiAnalysis analysis){
       return new AiAnalysisCreationResponse(
               analysis.getFile(),
               analysis.getStatus()
       );
   }
}
