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

import com.scu.clinic_system.dto.ManagerRegistrationRequest;
import java.util.List;
import org.springframework.security.core.Authentication;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/management")
@PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
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
    public ResponseEntity<?> listClinics(Authentication authentication) {
        String email = authentication.getName();
        User currentUser = userRepository.findByEmail(email).orElse(null);

        if (currentUser == null || currentUser.getClinic() == null) {
            return ResponseEntity.ok(clinicRepository.findAll());
        }

        Clinic userClinic = currentUser.getClinic();

        if (userClinic.getParentClinic() != null) {
            // É filial. Só vê ela mesma.
            return ResponseEntity.ok(java.util.List.of(userClinic));
        } else {
            // É Matriz. Vê ela mesma e todas as filiais dela.
            java.util.List<Clinic> clinics = new java.util.ArrayList<>();
            clinics.add(userClinic);
            clinics.addAll(clinicRepository.findByParentClinicId(userClinic.getId()));
            return ResponseEntity.ok(clinics);
        }
    }

    @PostMapping("/create-clinic")
    @Transactional
    public ResponseEntity<?> createClinic(@RequestBody @Valid ClinicRegistrationRequest req) {
        if (clinicRepository.existsByCnpj(req.cnpj())) {
            return ResponseEntity.badRequest().body("Erro: CNPJ já cadastrado.");
        }

        Clinic clinic = new Clinic();
        clinic.setName(req.clinicName());
        clinic.setCnpj(req.cnpj());
        clinic.setAddress(req.address());
        clinic.setPhone(req.phone());

        if (req.parentClinicId() != null) {
            Clinic parent = clinicRepository.findById(req.parentClinicId())
                    .orElseThrow(() -> new RuntimeException("Clínica matriz não encontrada."));
            clinic.setParentClinic(parent);
        }

        Clinic savedClinic = clinicRepository.save(clinic);
        return ResponseEntity.ok(savedClinic);
    }

    @PostMapping("/create-manager")
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    @Transactional
    public ResponseEntity<?> createManager(@RequestBody @Valid ManagerRegistrationRequest req) {
        if (userRepository.existsByEmail(req.email())) {
            return ResponseEntity.badRequest().body("Erro: Email do manager já está em uso.");
        }
        if (userRepository.existsByCpf(req.cpf())) {
            return ResponseEntity.badRequest().body("Erro: CPF do manager já está em uso.");
        }

        Clinic clinic = clinicRepository.findById(req.clinicId())
                .orElseThrow(() -> new RuntimeException("Clínica não encontrada."));

        User admin = new User();
        admin.setName(req.name());
        admin.setEmail(req.email());
        admin.setCpf(req.cpf());
        admin.setBirthDate(LocalDate.parse(req.birthDate()));
        admin.setPassword(encoder.encode(req.password()));
        admin.setRole(Role.admin);
        admin.setClinic(clinic);
        admin.setActive(true);
        User savedAdmin = userRepository.save(admin);

        return ResponseEntity.ok("Manager '" + savedAdmin.getName() + "' criado com sucesso!");
    }
    
    @GetMapping("/managers")
    public ResponseEntity<?> listManagers() {
        return ResponseEntity.ok(userRepository.findAll().stream()
                .filter(u -> u.getRole() == Role.admin)
                .map(u -> new ManagerResponse(
                        u.getId().toString(),
                        u.getName(),
                        u.getEmail(),
                        u.getCpf(),
                        u.getClinic() != null ? u.getClinic().getName() : "Sem Clínica",
                        u.isActive()
                ))
                .toList());
    }

    record ManagerResponse(String id, String name, String email, String cpf, String clinicName, boolean active) {}
}
