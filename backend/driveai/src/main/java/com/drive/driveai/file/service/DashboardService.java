package com.drive.driveai.file.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.drive.driveai.file.dto.DashboardResponse;
import com.drive.driveai.file.enums.FileStatus;
import com.drive.driveai.file.repository.FileRepository;
import com.drive.driveai.user.entity.User;
import com.drive.driveai.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
public class DashboardService {

    private final FileRepository fileRepository;
    private final UserRepository userRepository;
    public DashboardResponse getDashboardData(UUID userId) {
        
       User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    
       long totalFiles = fileRepository.countByUploadedByAndDeletedAtIsNull(user);
        LocalDateTime startOfMonth = LocalDateTime.now()
                .withDayOfMonth(1)
                .withHour(0)
                .withMinute(0)
                .withSecond(0)
                .withNano(0);
       long filesUploadedThisMonth = fileRepository.countByUploadedByAndDeletedAtIsNullAndCreatedAtGreaterThanEqual(user, startOfMonth);
        long aiProcessedFiles = fileRepository.countByUploadedByAndDeletedAtIsNullAndStatus(user,FileStatus.ANALYZED);
        return new DashboardResponse(totalFiles, filesUploadedThisMonth, aiProcessedFiles, 0);  
    }
    
}
