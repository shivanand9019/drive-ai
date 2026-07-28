package com.drive.driveai.user.service;

import java.nio.file.OpenOption;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.drive.driveai.exception.EmailAlreadyExistsException;
import com.drive.driveai.exception.InvalidCredentialsException;
import com.drive.driveai.exception.UserNotFoundException;
import com.drive.driveai.user.dto.CurrentUserResponse;
import com.drive.driveai.user.dto.LoginRequest;
import com.drive.driveai.user.dto.LoginResponse;

import com.drive.driveai.user.dto.RegisterRequest;
import com.drive.driveai.user.dto.RegisterResponse;
import com.drive.driveai.user.entity.User;
import com.drive.driveai.user.enums.AccountStatus;
import com.drive.driveai.user.enums.Role;
import com.drive.driveai.user.mapper.UserMapper;
import com.drive.driveai.user.repository.UserRepository;



@Service
public class UserService {
  
    private final UserMapper userMapper;
    
    private final UserRepository userRepository;
 
    private final PasswordEncoder passwordEncoder;
    
    public UserService(UserMapper userMapper,UserRepository userRepository,PasswordEncoder passwordEncoder){
        this.userMapper = userMapper;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;

    }
    
    

    

    public RegisterResponse registerUser(RegisterRequest request) {

        // check email exists
        String email = request.getEmail().trim().toLowerCase();
        if(userRepository.existsByEmailAndDeletedAtIsNull(email)){
           throw new EmailAlreadyExistsException("Email Already Exists");
        }
        User user = userMapper.mapToEntity(request);
        
        String hashedPassword = passwordEncoder.encode(request.getPassword());

        user.setPasswordHash(hashedPassword);
    
        user.setStatus(AccountStatus.ACTIVE);
        user.setEmailVerified(false);
        user.setRole(Role.USER);

        user.setCreatedAt(LocalDateTime.now());

        user.setUpdatedAt(null);
        user.setLastLoginAt(null);
        user.setDeletedAt(null);
        User savedUser = userRepository.save(user);


        RegisterResponse response = userMapper.mapToResponse(savedUser);
        

        return response;
       
    }





    public LoginResponse loginUser(LoginRequest request) {
        User user = userRepository.
                        findByEmailAndDeletedAtIsNull(request.getEmail())
                        .orElseThrow(() -> 
                        new InvalidCredentialsException("Invalid email or password"));
        if(!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())){
            throw new InvalidCredentialsException("Invalid email or password");
        }
        LoginResponse response = new LoginResponse();
        return response;



        
        
    }





    public CurrentUserResponse getCurrentUser(UUID userId) {

        User user = userRepository
                        .findByIdAndDeletedAtIsNull(userId)
                        .orElseThrow(()->
                        new UserNotFoundException(
                        "User Not found with id: "+ userId));

        
        return userMapper.mapToCurrentUserResponse(user);
       
    }
}

