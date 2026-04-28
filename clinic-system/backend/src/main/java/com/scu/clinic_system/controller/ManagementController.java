package com.scu.clinic_system.controller;

import com.scu.clinic_system.dto.ClinicRegistrationRequest;
import com.scu.clinic_system.model.Clinic;
import com.scu.clinic_system.model.Role;
import com.scu.clinic_system.model.User;
import com.scu.clinic_system.repository.ClinicRepository;
import com.scu.clinic_system.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/management")
@PreAuthorize("hasRole('MANAGER')")
public class ManagementController {

    private final ClinicRepository clinicRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public ManagementController(ClinicRepository clinicRepository,
                                UserRepository userRepository,
                                PasswordEncoder encoder) {
        this.clinicRepository = clinicRepository;
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    @GetMapping("/clinics")
    public ResponseEntity<?> listClinics() {
        return ResponseEntity.ok(clinicRepository.findAll());
    }

    @PostMapping("/create-clinic")
    @Transactional
    public ResponseEntity<?> createClinicAndAdmin(@RequestBody @Valid ClinicRegistrationRequest req) {

        if (clinicRepository.existsByCnpj(req.cnpj())) {
            return ResponseEntity.badRequest().body("Erro: CNPJ já cadastrado.");
        }
        if (userRepository.existsByEmail(req.adminEmail())) {
            return ResponseEntity.badRequest().body("Erro: Email do admin já está em uso.");
        }
        if (userRepository.existsByCpf(req.adminCpf())) {
            return ResponseEntity.badRequest().body("Erro: CPF do admin já está em uso.");
        }

        Clinic clinic = new Clinic();
        clinic.setName(req.clinicName());
        clinic.setCnpj(req.cnpj());
        clinic.setAddress(req.address());
        clinic.setPhone(req.phone());
        Clinic savedClinic = clinicRepository.save(clinic);

        User admin = new User();
        admin.setName(req.adminName());
        admin.setEmail(req.adminEmail());
        admin.setCpf(req.adminCpf());
        admin.setBirthDate(LocalDate.parse(req.adminBirthDate()));
        admin.setPassword(encoder.encode(req.adminPassword()));
        admin.setRole(Role.admin);
        admin.setActive(true);
        userRepository.save(admin);

        return ResponseEntity.ok("Clínica '" + savedClinic.getName() + "' e Admin criados com sucesso!");
    }
}
