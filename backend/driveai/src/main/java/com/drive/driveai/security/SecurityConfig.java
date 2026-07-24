package com.drive.driveai.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
public class SecurityConfig {

    
    private final AuthenticationProvider authenticationProvider;
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    public SecurityConfig(AuthenticationProvider authenticationProvider,JwtAuthenticationFilter jwtAuthenticationFilter){
        this.authenticationProvider=authenticationProvider;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }
    @Bean
    SecurityFilterChain securityFilterChain (HttpSecurity http){
        http
            .csrf(csrf->csrf.disable())
            .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authenticationProvider)
            .authorizeHttpRequests(auth-> auth
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        .anyRequest().authenticated()

             )  
            .addFilterAfter(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
            
        return http.build();

    }
    
}
