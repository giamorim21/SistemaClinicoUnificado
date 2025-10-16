package com.scu.clinic_system.service;

import com.scu.clinic_system.model.Pacient;
import com.scu.clinic_system.repository.PacientRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Service
public class PacientService {

    private final PacientRepository repository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public PacientService(PacientRepository repository) {
        this.repository = repository;
    }

    public Pacient createPacient(Pacient pacient) {

        // Calcula idade a partir da data de nascimento
        if (pacient.getBirthDate() != null) {
            pacient.setAge(Period.between(pacient.getBirthDate(), LocalDate.now()).getYears());
        }

        // Hash da senha (BCrypt)
        if (pacient.getPassword() != null && !pacient.getPassword().startsWith("$2a$")) {
            pacient.setPassword(passwordEncoder.encode(pacient.getPassword()));
        }

        // Valida e hash do CPF
        if (pacient.getCpf() != null) {
            String rawCpf = pacient.getCpf();
            if (!isValidCPF(rawCpf)) {
                throw new RuntimeException("CPF inválido");
            }
            pacient.setCpf(hashSensitiveData(rawCpf));
        }

        // Hash do RG / Identity (SHA-256)
        if (pacient.getIdentity() != null && !pacient.getIdentity().isEmpty()) {
            pacient.setIdentity(hashSensitiveData(pacient.getIdentity()));
        }

        // Define a data de consentimento caso seja verdadeiro
        pacient.setConsentDate(pacient.getConsent() != null && pacient.getConsent() ? LocalDate.now() : null);

        return repository.save(pacient);
    }

    public List<Pacient> getAllPacients() {
        return repository.findAll();
    }

    public Pacient getPacientById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));
    }

    public Pacient updatePacient(Long id, Pacient updatedPacient) {
        Pacient pacient = getPacientById(id);

        pacient.setFullName(updatedPacient.getFullName());
        pacient.setEmail(updatedPacient.getEmail());
        pacient.setPhone(updatedPacient.getPhone());
        pacient.setAddress(updatedPacient.getAddress());

        if (updatedPacient.getBirthDate() != null) {
            pacient.setBirthDate(updatedPacient.getBirthDate());
            pacient.setAge(Period.between(updatedPacient.getBirthDate(), LocalDate.now()).getYears());
        }

        return repository.save(pacient);
    }

    public void deletePacient(Long id) {
        repository.deleteById(id);
    }

    private String hashSensitiveData(String data) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedHash = digest.digest(data.getBytes());
            StringBuilder hexString = new StringBuilder();
            for (byte b : encodedHash) {
                hexString.append(String.format("%02x", b));
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Erro ao gerar hash: " + e.getMessage());
        }
    }

    // Valida CPF (11 dígitos + dígitos verificadores)
    private boolean isValidCPF(String cpf) {
        if (cpf == null || !cpf.matches("\\d{11}")) return false;

        // Checa se todos os dígitos são iguais
        if (cpf.chars().distinct().count() == 1) return false;

        try {
            int[] numbers = cpf.chars().map(c -> c - '0').toArray();

            // Primeiro dígito verificador
            int sum = 0;
            for (int i = 0; i < 9; i++) sum += numbers[i] * (10 - i);
            int firstCheck = 11 - (sum % 11);
            if (firstCheck >= 10) firstCheck = 0;
            if (numbers[9] != firstCheck) return false;

            // Segundo dígito verificador
            sum = 0;
            for (int i = 0; i < 10; i++) sum += numbers[i] * (11 - i);
            int secondCheck = 11 - (sum % 11);
            if (secondCheck >= 10) secondCheck = 0;
            return numbers[10] == secondCheck;

        } catch (Exception e) {
            return false;
        }
    }
}
