package com.scu.clinic_system.service;

import com.scu.clinic_system.model.Pacient;
import com.scu.clinic_system.repository.PacientRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PacientService {

    private final PacientRepository repository;

    public PacientService(PacientRepository repository) {
        this.repository = repository;
    }

    public Pacient createPacient(Pacient pacient) {
        pacient.setConsentDate(pacient.getConsent() ? LocalDate.now() : null);
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

        return repository.save(pacient);
    }

    public void deletePacient(Long id) {
        repository.deleteById(id);
    }
}
