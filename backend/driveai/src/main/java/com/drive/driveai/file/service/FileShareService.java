package com.drive.driveai.file.service;

import com.drive.driveai.exception.FileAlreadySharedException;
import com.drive.driveai.exception.FileMetadataNotFoundException;
import com.drive.driveai.exception.UserNotFoundException;
import com.drive.driveai.file.dto.FileResponse;
import com.drive.driveai.file.entity.FileMetadata;
import com.drive.driveai.file.entity.FileShare;
import com.drive.driveai.file.mapper.FileMapper;
import com.drive.driveai.file.repository.FileRepository;
import com.drive.driveai.file.repository.FileShareRepository;
import com.drive.driveai.user.entity.User;
import com.drive.driveai.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;


import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileShareService {

    private final FileShareRepository fileShareRepository;
    private final FileRepository fileRepository;
    private  final UserRepository userRepository;
    private final FileMapper fileMapper;

    public void shareFile(UUID fileId, UUID currentUserId,String recipientEmail){

        FileMetadata file = fileRepository.findByIdAndDeletedAtIsNull(fileId).orElseThrow(()-> new FileMetadataNotFoundException("File not found"));

        if(!file.getUploadedBy().getId().equals(currentUserId)){
            throw  new AccessDeniedException("You are not authorized to access this file");
        }

        User recipientUser = userRepository.findByEmailAndDeletedAtIsNull(recipientEmail).orElseThrow(()->
                new UserNotFoundException("User not found with email :"+recipientEmail));
        User sharedBy = userRepository.findByIdAndDeletedAtIsNull(currentUserId).orElseThrow(()->
                new UserNotFoundException("User not found with id:"+currentUserId));

        if(recipientUser.getId().equals(currentUserId)){
            throw  new IllegalArgumentException("You cannot share a file with yourself");
        }

        if(fileShareRepository.existsByFileAndSharedWith(file,recipientUser)){
            throw new FileAlreadySharedException("File is already shared with this user");
        }
        FileShare fileShare =  new FileShare();
        fileShare.setFile(file);
        fileShare.setSharedBy(sharedBy);
        fileShare.setSharedWith(recipientUser);
        fileShareRepository.save(fileShare);

    }


    public Page<FileResponse> getSharedFiles(UUID id, Pageable pageable) {
        User user = userRepository.findByIdAndDeletedAtIsNull(id).orElseThrow(()-> new UserNotFoundException("Not found"));
        Page<FileShare> shares =  fileShareRepository.findBySharedWithAndDeletedAtIsNull(user,pageable);
        return shares.map(share-> fileMapper.mapToFileResponse(share.getFile()));
    }
}
