package com.scu.clinic_system.repository;

import com.scu.clinic_system.model.Clinic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClinicRepository extends JpaRepository<Clinic, Long> {
    boolean existsByCnpj(String cnpj);
}