// com/scu/clinic_system/controller/AuthController.java
package com.scu.clinic_system.controller;

import com.scu.clinic_system.model.Role;
import com.scu.clinic_system.model.User;
import com.scu.clinic_system.repository.UserRepository;
import com.scu.clinic_system.security.JwtService;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    // ==========================================
    // 🔐 Variáveis de ambiente para o ADMIN
    // ==========================================
    @Value("${app.admin.email:admin@scu.local}")
    private String adminEmail;

    @Value("${app.admin.password:Admin#123}")
    private String adminPassword;

    record LoginRequest(@NotBlank String email, @NotBlank String password) {}
    record TokenResponse(String token) {}

    private final AuthenticationManager authManager;
    private final JwtService jwt;
    private final UserRepository users;
    private final PasswordEncoder encoder;

    public AuthController(AuthenticationManager authManager, JwtService jwt, UserRepository users, PasswordEncoder encoder) {
        this.authManager = authManager;
        this.jwt = jwt;
        this.users = users;
        this.encoder = encoder;
    }

    // ==========================================
    // 🧩 LOGIN NORMAL
    // ==========================================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
            authManager.authenticate(new UsernamePasswordAuthenticationToken(req.email(), req.password()));
            var user = users.findByEmail(req.email()).orElseThrow();
            var token = jwt.generateToken(
                    user.getEmail(),
                    user.getRoles().stream().map(Enum::name).toList()
            );
            return ResponseEntity.ok(new TokenResponse(token));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Credenciais inválidas");
        }
    }


    @PostMapping("/seed-manager")
    public ResponseEntity<?> seedManager() {
        if (users.existsByEmail(adminEmail)) { // adminEmail vindo do application.properties
            return ResponseEntity.ok("ℹ️ Manager já existe: " + adminEmail);
        }

        // Usamos a classe User base, pois o Manager não precisa ser Médico nem Recepcionista
        // E ele NÃO TEM CLÍNICA (clinic = null), pois ele vê tudo.
        User manager = new User();
        manager.setEmail(adminEmail);
        manager.setPassword(encoder.encode(adminPassword));

        // ATENÇÃO: Mudamos para ROLE_MANAGEMENT
        manager.setRoles(Set.of(Role.ROLE_MANAGEMENT));

        manager.setEnabled(true);
        users.save(manager);

        return ResponseEntity.ok("✅ Super User (Manager) criado: " + adminEmail);
    }
}
