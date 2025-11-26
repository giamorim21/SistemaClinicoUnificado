package com.scu.clinic_system.controller;

import com.scu.clinic_system.model.Pacient;
import com.scu.clinic_system.model.Role;
import com.scu.clinic_system.service.PacientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/pacients")
public class PacientController {

    private final PacientService service;
    private final PasswordEncoder encoder; // 1. Adicionamos o codificador de senha

    // 2. Injetamos ele no construtor
    public PacientController(PacientService service, PasswordEncoder encoder) {
        this.service = service;
        this.encoder = encoder;
    }

    @PostMapping("/register")
    public ResponseEntity<Pacient> registerPacient(@Valid @RequestBody Pacient pacient) {

        // --- LÓGICA DE NEGÓCIO E SEGURANÇA ---

        // 1. Criptografar a senha: O usuário digita "123", nós salvamos "$2a$10$..."
        pacient.setPassword(encoder.encode(pacient.getPassword()));

        // 2. Definir Perfil: Quem se cadastra por aqui é sempre PACIENTE
        pacient.setRoles(Set.of(Role.ROLE_PATIENT));

        // 3. Sistema Unificado:
        // Forçamos a clínica a ser NULL. Isso torna o paciente um usuário GLOBAL.
        // Ele não pertence à clínica X ou Y, ele pertence ao sistema.
        pacient.setClinic(null);

        // --------------------------------------

        Pacient created = service.createPacient(pacient);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Pacient> getAllPacients() {
        return service.getAllPacients();
    }

    @GetMapping("/{id}")
    public Pacient getPacient(@PathVariable Long id) {
        return service.getPacientById(id);
    }

    @PutMapping("/{id}")
    public Pacient updatePacient(@PathVariable Long id, @Valid @RequestBody Pacient pacient) {
        return service.updatePacient(id, pacient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePacient(@PathVariable Long id) {
        service.deletePacient(id);
        return ResponseEntity.noContent().build();
    }
}