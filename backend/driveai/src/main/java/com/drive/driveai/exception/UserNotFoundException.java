package com.drive.driveai.exception;

public class UserNotFoundException extends RuntimeException {
    

    public UserNotFoundException(String message){
        super(message);
    }
}
