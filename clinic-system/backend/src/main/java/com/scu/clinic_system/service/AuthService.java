package com.scu.clinic_system.service;

import com.scu.clinic_system.dto.AuthResponse;
import com.scu.clinic_system.dto.LoginRequest;
import com.scu.clinic_system.model.Pacient;
import com.scu.clinic_system.repository.PacientRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.util.Optional;

@Service
public class AuthService {

    private final PacientRepository pacientRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(PacientRepository pacientRepository) {
        this.pacientRepository = pacientRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public AuthResponse login(LoginRequest request) {
        // 1️⃣ Gerar hash do CPF enviado pelo usuário
        String hashedCpf = hashSensitiveData(request.getCpf());

        // 2️⃣ Buscar paciente pelo CPF hash
        Optional<Pacient> optionalPacient = pacientRepository.findByCpf(hashedCpf);

        if (optionalPacient.isEmpty()) {
            throw new RuntimeException("CPF não encontrado.");
        }

        Pacient pacient = optionalPacient.get();

        // 3️⃣ Validar senha com BCrypt
        if (!passwordEncoder.matches(request.getPassword(), pacient.getPassword())) {
            throw new RuntimeException("Senha incorreta.");
        }

        // 4️⃣ Retornar resposta de login
        return new AuthResponse("Login realizado com sucesso!", pacient.getId(), pacient.getFullName());
    }

    // Método para gerar hash SHA-256 do CPF
    private String hashSensitiveData(String data) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedHash = digest.digest(data.getBytes());
            StringBuilder hexString = new StringBuilder();
            for (byte b : encodedHash) {
                hexString.append(String.format("%02x", b));
            }
            return hexString.toString();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao gerar hash: " + e.getMessage());
        }
    }
}
