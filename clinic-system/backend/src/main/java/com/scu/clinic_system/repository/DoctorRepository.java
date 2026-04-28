package com.scu.clinic_system.repository;

import com.scu.clinic_system.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DoctorRepository extends JpaRepository<Doctor, UUID> {
    Optional<Doctor> findByUserId(UUID userId);
    List<Doctor> findByClinicId(UUID clinicId);
    List<Doctor> findBySpecialtyId(UUID specialtyId);
    boolean existsByCouncilTypeAndCouncilNumberAndCouncilState(
            com.scu.clinic_system.model.CouncilType type, String number, String state);
}
