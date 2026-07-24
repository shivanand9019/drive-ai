package com.drive.driveai.user.repository;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.drive.driveai.user.entity.User;
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmailAndDeletedAtIsNull(String email);
   
    boolean existsByEmailAndDeletedAtIsNull(String email);

}
