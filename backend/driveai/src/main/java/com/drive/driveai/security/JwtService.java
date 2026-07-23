package com.drive.driveai.security;

import java.sql.Date;

import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {

    String generateToken(UserDetails userDetails);
    String  extractUsername(String token);
    Date extractExpiration(String token);
    boolean isTokenExpired(String token);
    String validateToken(String token ,UserDetails userDetails);


    
}
