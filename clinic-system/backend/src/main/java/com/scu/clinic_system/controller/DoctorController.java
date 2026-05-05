package com.scu.clinic_system.controller;

import com.scu.clinic_system.model.Doctor;
import com.scu.clinic_system.repository.DoctorRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/doctor")
@PreAuthorize("hasRole('DOCTOR')")
public class DoctorController {

    private final DoctorRepository doctors;

    public DoctorController(DoctorRepository doctors) {
        this.doctors = doctors;
    }

    @GetMapping("/profile")
    public ResponseEntity<Doctor> myProfile(
            org.springframework.security.core.Authentication auth) {
        // O email vem do JWT; buscamos o user pelo email e depois o perfil de médico
        String email = auth.getName();
        return doctors.findAll().stream()
                .filter(d -> d.getUser().getEmail().equals(email))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/clinic/{clinicId}")
    @PreAuthorize("hasAnyRole('DOCTOR','ADMIN','MANAGER')")
    public List<Doctor> listByClinic(@PathVariable UUID clinicId) {
        return doctors.findByClinicId(clinicId);
    }
}
