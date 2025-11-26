package com.scu.clinic_system.controller;

import com.scu.clinic_system.dto.ClinicRegistrationRequest;
import com.scu.clinic_system.model.Admin;
import com.scu.clinic_system.model.Clinic;
import com.scu.clinic_system.model.Role;
import com.scu.clinic_system.repository.ClinicRepository;
import com.scu.clinic_system.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/management")
// Apenas usuários com role MANAGEMENT (você) podem acessar aqui
@PreAuthorize("hasRole('MANAGEMENT')")
public class ManagementController {

    private final ClinicRepository clinicRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public ManagementController(ClinicRepository clinicRepository, UserRepository userRepository, PasswordEncoder encoder) {
        this.clinicRepository = clinicRepository;
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    @PostMapping("/create-clinic")
    @Transactional // Importante: Se der erro ao criar o user, desfaz a criação da clínica
    public ResponseEntity<?> createClinicAndAdmin(@RequestBody @Valid ClinicRegistrationRequest request) {

        // 1. Validações básicas
        if (clinicRepository.existsByCnpj(request.cnpj())) {
            return ResponseEntity.badRequest().body("Erro: CNPJ já cadastrado.");
        }
        if (userRepository.existsByEmail(request.adminEmail())) {
            return ResponseEntity.badRequest().body("Erro: Email do admin já está em uso.");
        }

        // 2. Criar e Salvar a Clínica
        Clinic clinic = new Clinic();
        clinic.setName(request.clinicName());
        clinic.setCnpj(request.cnpj());
        clinic.setAddress(request.address());

        Clinic savedClinic = clinicRepository.save(clinic);

        // 3. Criar e Salvar o Admin vinculado à Clínica
        Admin admin = new Admin();
        admin.setEmail(request.adminEmail());
        admin.setPassword(encoder.encode(request.adminPassword()));
        admin.setRoles(Set.of(Role.ROLE_ADMIN)); // Ele é Admin da clínica
        admin.setEnabled(true);

        // O PULO DO GATO: Vincula o admin à clínica que acabamos de salvar
        admin.setClinic(savedClinic);

        userRepository.save(admin);

        return ResponseEntity.ok("Clínica " + savedClinic.getName() + " e Admin criados com sucesso!");
    }
}