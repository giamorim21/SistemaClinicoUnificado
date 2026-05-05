package com.scu.clinic_system.controller;

import com.scu.clinic_system.model.User;
import com.scu.clinic_system.repository.UserRepository;
import com.scu.clinic_system.security.JwtService;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    record LoginRequest(@NotBlank String email, @NotBlank String password) {}

    record LoginResponse(String token, String name, String email, String role) {}

    private final AuthenticationManager authManager;
    private final JwtService jwt;
    private final UserRepository users;

    public AuthController(AuthenticationManager authManager, JwtService jwt, UserRepository users) {
        this.authManager = authManager;
        this.jwt = jwt;
        this.users = users;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(req.email(), req.password()));

            User user = users.findByEmail(req.email()).orElseThrow();
            String roleAuthority = "ROLE_" + user.getRole().name().toUpperCase();
            String token = jwt.generateToken(user.getEmail(), List.of(roleAuthority));

            return ResponseEntity.ok(new LoginResponse(token, user.getName(), user.getEmail(), roleAuthority));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Credenciais inválidas");
        }
    }

}
