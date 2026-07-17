package com.drive.driveai.user.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import com.drive.driveai.user.enums.AccountStatus;
import com.drive.driveai.user.enums.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {
    // Identity and authentication fields
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // Personal information fields
    @Column(nullable = false)
    private String fullName;
    @Column(unique=true,nullable = false)
    private String email;
    @Column(nullable = false)
    private String passwordHash;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)

    // Account status field
    private AccountStatus status;
    @Column(nullable = false)
    private boolean isEmailVerified;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
   
    // Audit
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime lastLoginAt;
    private LocalDateTime deletedAt;

}