package com.drive.driveai.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.drive.driveai.user.entity.User;
import com.drive.driveai.user.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    public CustomUserDetailsService(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       User user = userRepository.findByEmailAndDeletedAtIsNull(username)
                    .orElseThrow(()-> new UsernameNotFoundException("No user found with email :" + username));
        

        return new CustomUserDetails(user);
    }


    
} 
