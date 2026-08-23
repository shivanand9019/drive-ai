package com.drive.driveai.ai.service;

import com.drive.driveai.ai.dto.AiAnalysisCreationResponse;

import com.drive.driveai.ai.entity.AiAnalysis;
import com.drive.driveai.ai.enums.AiStatus;
import com.drive.driveai.ai.mapper.AiAnalysisMapper;
import com.drive.driveai.ai.repository.AiAnalysisRepository;
import com.drive.driveai.exception.FileMetadataNotFoundException;
import com.drive.driveai.file.entity.FileMetadata;
import com.drive.driveai.file.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AiAnalysisService {

    private final AiAnalysisRepository aiAnalysisRepository;
    private  final FileRepository fileRepository;
    private final AiAnalysisMapper mapper;

    public AiAnalysisCreationResponse startAnalysis(UUID fileId, UUID currentUserId) {

        FileMetadata file = fileRepository.findByIdAndDeletedAtIsNull(fileId).orElseThrow(
                () -> new FileMetadataNotFoundException("File not found with the ID:" + fileId));


        if (!file.getUploadedBy().getId().equals(currentUserId)) {
            throw new AccessDeniedException("You are not authorized to access this file");
        }

        // check if analysis already exists
        Optional<AiAnalysis> aiAnalysis = aiAnalysisRepository.findAiAnalysisByFileId(fileId);
        if (aiAnalysis.isPresent()) {
            throw new RuntimeException("Analysis already exists");

        } else {
            // analysis creation
            AiAnalysis analysis = new AiAnalysis();
            analysis.setFile(file);
            analysis.setStatus(AiStatus.PENDING);
            aiAnalysisRepository.save(analysis);
            return mapper.mapToAiAnalysisCreationResponse(analysis);

        }
    }
}
