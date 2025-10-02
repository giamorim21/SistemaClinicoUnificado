package com.scu.clinic_system.repository;

import com.scu.clinic_system.model.Receptionist;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ReceptionistRepository extends JpaRepository<Receptionist, Long> {
    Optional<Receptionist> findByCpf(String cpf);
    Optional<Receptionist> findByEmail(String email);
    Optional<Receptionist> findByRegistrationNumber(String registrationNumber);
}
