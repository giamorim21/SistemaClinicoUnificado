package com.scu.clinic_system.repository;

import com.scu.clinic_system.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

// Mudança: de 'public class' para 'public interface'
// Mudança: adicionado 'extends JpaRepository<Doctor, Long>'
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    // Opcional: Se você precisar buscar médico por CRM no futuro:
    // Optional<Doctor> findByCrm(String crm);
}