package com.scu.clinic_system.repository;

import com.scu.clinic_system.model.Pacient;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PacientRepository extends JpaRepository<Pacient, Long> {
    Optional<Pacient> findByEmail(String email);
    Optional<Pacient> findByCpf(String cpf);
}
