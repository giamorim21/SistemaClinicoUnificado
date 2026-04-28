package com.scu.clinic_system.controller;

import com.scu.clinic_system.model.Role;
import com.scu.clinic_system.model.User;
import com.scu.clinic_system.repository.UserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/pacients")
public class PacientController {

    private final UserRepository users;
    private final PasswordEncoder encoder;

    public PacientController(UserRepository users, PasswordEncoder encoder) {
        this.users = users;
        this.encoder = encoder;
    }

    record RegisterRequest(
            @NotBlank String name,
            @Email @NotBlank String email,
            @NotBlank @Size(min = 11, max = 11) String cpf,
            @NotBlank String birthDate,
            @NotBlank String password
    ) {}

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        if (users.existsByEmail(req.email())) {
            return ResponseEntity.badRequest().body("Email já cadastrado.");
        }
        if (users.existsByCpf(req.cpf())) {
            return ResponseEntity.badRequest().body("CPF já cadastrado.");
        }

        User user = new User();
        user.setName(req.name());
        user.setEmail(req.email());
        user.setCpf(req.cpf());
        user.setBirthDate(LocalDate.parse(req.birthDate()));
        user.setPassword(encoder.encode(req.password()));
        user.setRole(Role.patient);
        user.setActive(true);

        return ResponseEntity.status(HttpStatus.CREATED).body(users.save(user));
    }

    @GetMapping
    public List<User> listPatients() {
        return users.findAll().stream()
                .filter(u -> u.getRole() == Role.patient)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getPatient(@PathVariable UUID id) {
        return users.findById(id)
                .filter(u -> u.getRole() == Role.patient)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
