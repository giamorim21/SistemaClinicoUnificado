package com.scu.clinic_system.repository;

import com.scu.clinic_system.model.Clinic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ClinicRepository extends JpaRepository<Clinic, UUID> {
    boolean existsByCnpj(String cnpj);
    Optional<Clinic> findByCnpj(String cnpj);
    java.util.List<Clinic> findByParentClinicId(UUID parentClinicId);
}
