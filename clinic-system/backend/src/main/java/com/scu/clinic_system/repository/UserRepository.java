// com/scu/clinic_system/repository/UserRepository.java
package com.scu.clinic_system.repository;

import com.scu.clinic_system.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
