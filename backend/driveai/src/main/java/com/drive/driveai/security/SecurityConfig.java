package com.drive.driveai.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static java.util.List.*;


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
                .cors(Customizer.withDefaults())
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
    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration =  new CorsConfiguration();
        configuration.setAllowedOrigins(of("http://localhost:5173"));
        configuration.setAllowedMethods(of("GET","POST","PUT","DELETE","OPTIONS"));
        configuration.setAllowedHeaders(of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;

    }
    
}
