package com.drive.driveai.user.mapper;

import org.springframework.stereotype.Component;

import com.drive.driveai.user.dto.RegisterRequest;
import com.drive.driveai.user.dto.RegisterResponse;
import com.drive.driveai.user.entity.User;

@Component
public class UserMapper {

        public  User mapToEntity(RegisterRequest request) {
            User user = new User();
            user.setFullName(request.getFullName());
            user.setEmail(request.getEmail());
           
            return user;
        }

        public  RegisterResponse mapToResponse(User user){
            RegisterResponse response = new RegisterResponse();
            response.setUserId(user.getId());
            response.setFullName(user.getFullName());
            response.setEmail(user.getEmail());
            return response;
        }

}