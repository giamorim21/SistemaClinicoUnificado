package com.scu.clinic_system.controller;

import com.scu.clinic_system.model.*;
import com.scu.clinic_system.repository.*;
import com.scu.clinic_system.service.DoctorService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
public class AdminController {

    private final PasswordEncoder encoder;
    private final UserRepository users;
    private final DoctorRepository doctors;
    private final ClinicRepository clinics;
    private final SpecialtyRepository specialties;
    private final DoctorService doctorService;

    public AdminController(PasswordEncoder encoder, UserRepository users,
                           DoctorRepository doctors, ClinicRepository clinics,
                           SpecialtyRepository specialties, DoctorService doctorService) {
        this.encoder = encoder;
        this.users = users;
        this.doctors = doctors;
        this.clinics = clinics;
        this.specialties = specialties;
        this.doctorService = doctorService;
    }

    // ── DTO de resposta (evita lazy loading na serialização JSON) ──────────
    record DoctorResponse(
            String id,
            String userName, String userEmail, String userCpf,
            String specialtyName, String clinicId, String clinicName,
            String councilType, String councilNumber, String councilState, String councilStatus,
            String rqe, String formation, String languages, String areasOfPractice,
            boolean profileEnabled
    ) {
        static DoctorResponse from(Doctor d) {
            return new DoctorResponse(
                    d.getId().toString(),
                    d.getUser().getName(), d.getUser().getEmail(), d.getUser().getCpf(),
                    d.getSpecialty().getName(),
                    d.getClinic().getId().toString(), d.getClinic().getName(),
                    d.getCouncilType().name(), d.getCouncilNumber(),
                    d.getCouncilState(), d.getCouncilStatus().name(),
                    d.getRqe(), d.getFormation(), d.getLanguages(), d.getAreasOfPractice(),
                    d.isProfileEnabled()
            );
        }
    }

    // ── GET: lista todos os médicos ────────────────────────────────────────
    @GetMapping("/staff/doctors")
    @Transactional(readOnly = true)
    public List<DoctorResponse> listDoctors() {
        return doctors.findAll().stream().map(DoctorResponse::from).toList();
    }

    // ── POST: cria médico + usuário vinculado ──────────────────────────────
    record CreateDoctorRequest(
            String name, String email, String cpf, String birthDate, String password,
            UUID specialtyId, UUID clinicId,
            String councilNumber, String councilState, CouncilType councilType,
            String rqe, String formation, String languages, String areasOfPractice
    ) {}

    @PostMapping("/staff/doctor")
    @Transactional
    public ResponseEntity<?> createDoctor(@Valid @RequestBody CreateDoctorRequest req) {
        if (users.existsByEmail(req.email()))
            return ResponseEntity.badRequest().body("Email já cadastrado.");
        if (users.existsByCpf(req.cpf()))
            return ResponseEntity.badRequest().body("CPF já cadastrado.");

        Specialty specialty = specialties.findById(req.specialtyId())
                .orElseThrow(() -> new RuntimeException("Especialidade não encontrada"));
        Clinic clinic = clinics.findById(req.clinicId())
                .orElseThrow(() -> new RuntimeException("Clínica não encontrada"));

        User user = new User();
        user.setName(req.name());
        user.setEmail(req.email());
        user.setCpf(req.cpf());
        user.setBirthDate(LocalDate.parse(req.birthDate()));
        user.setPassword(encoder.encode(req.password()));
        user.setRole(Role.doctor);
        user.setActive(true);
        User savedUser = users.save(user);

        Doctor doctor = new Doctor();
        doctor.setUser(savedUser);
        doctor.setSpecialty(specialty);
        doctor.setClinic(clinic);
        doctor.setCouncilType(req.councilType());
        doctor.setCouncilNumber(req.councilNumber());
        doctor.setCouncilState(req.councilState());
        doctor.setCouncilStatus(CouncilStatus.active);
        doctor.setRqe(req.rqe());
        doctor.setFormation(req.formation());
        doctor.setLanguages(req.languages());
        doctor.setAreasOfPractice(req.areasOfPractice());
        Doctor saved = doctors.save(doctor);

        return ResponseEntity.ok(DoctorResponse.from(saved));
    }

    // ── POST: desativar médico ─────────────────────────────────────────────
    @PostMapping("/staff/doctor/{id}/toggle")
    @Transactional
    public ResponseEntity<?> toggleDoctor(@PathVariable UUID id) {
        return doctors.findById(id).map(d -> {
            d.setProfileEnabled(!d.isProfileEnabled());
            d.getUser().setActive(!d.getUser().isActive());
            return ResponseEntity.ok(DoctorResponse.from(doctors.save(d)));
        }).orElse(ResponseEntity.notFound().build());
    }
}
