package com.drive.driveai.exception;

import java.time.LocalDateTime;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException ex, 
        HttpServletRequest request){
      Map<String, String> errors = new HashMap<>();
      

     List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();

     for(FieldError error:fieldErrors){
        errors.put(
            error.getField(),
            error.getDefaultMessage()
        );
     }

     ErrorResponse response = ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.BAD_REQUEST.value())
            .error(HttpStatus.BAD_REQUEST.getReasonPhrase())
            .message("Validation Failed")
            .path(request.getRequestURI())
            .errors(errors)
            .build();

    return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(response);
     
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleEmailALreadyExistsException(EmailAlreadyExistsException ex, 
        HttpServletRequest request){

            ErrorResponse response = ErrorResponse.builder()
                            .timestamp(LocalDateTime.now())
                            .status(HttpStatus.CONFLICT.value())
                            .error("Confilct")
                            .message(ex.getMessage())
                            .path(request.getRequestURI())
                            .errors(Collections.emptyMap())
                            .build();

            return ResponseEntity   
                    .status(HttpStatus.CONFLICT)
                 
                    .body(response);
        }

        @ExceptionHandler(InvalidCredentialsException.class)
        public ResponseEntity<ErrorResponse> handleInvalidCredentialsException(InvalidCredentialsException ex,HttpServletRequest request){
            ErrorResponse response =  ErrorResponse.builder()
                                .timestamp(LocalDateTime.now())
                                .status(HttpStatus.BAD_REQUEST.value())
                                .error("Invalid Credentials")
                                .message(ex.getMessage())
                                .path(request.getRequestURI())
                                .errors(Collections.emptyMap())
                                .build();

            return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(response);
        }

        @ExceptionHandler(BadCredentialsException.class)
        public ResponseEntity<ErrorResponse> handleBadCredentialException(BadCredentialsException ex, HttpServletRequest request){
            ErrorResponse response = ErrorResponse.builder()
                                    .timestamp(LocalDateTime.now())
                                    .status(HttpStatus.UNAUTHORIZED.value())
                                    .error("Invalid email or password ")
                                    .message(ex.getMessage())
                                    .path(request.getRequestURI())
                                    .errors(Collections.emptyMap())
                                    .build();
        

        return ResponseEntity
                            .status(HttpStatus.UNAUTHORIZED)
                            .body(response);
        }
    
                        
}
