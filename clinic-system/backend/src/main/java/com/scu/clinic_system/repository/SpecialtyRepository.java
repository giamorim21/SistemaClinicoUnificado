package com.scu.clinic_system.repository;

import com.scu.clinic_system.model.Specialty;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface SpecialtyRepository extends JpaRepository<Specialty, UUID> {
    Optional<Specialty> findByName(String name);
    boolean existsByName(String name);
}
