package com.scu.clinic_system.service;

import com.scu.clinic_system.model.Receptionist;
import com.scu.clinic_system.repository.ReceptionistRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReceptionistService {

    private final ReceptionistRepository repository;

    public ReceptionistService(ReceptionistRepository repository) {
        this.repository = repository;
    }

    public Receptionist createReceptionist(Receptionist receptionist) {
        return repository.save(receptionist);
    }

    public List<Receptionist> getAllReceptionists() {
        return repository.findAll();
    }

    public Receptionist getReceptionistById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Receptionist not found"));
    }

    public Receptionist updateReceptionist(Long id, Receptionist updated) {
        Receptionist receptionist = getReceptionistById(id);

        receptionist.setFullName(updated.getFullName());
        receptionist.setCpf(updated.getCpf());
        receptionist.setBirthDate(updated.getBirthDate());
        receptionist.setGender(updated.getGender());
        receptionist.setAddress(updated.getAddress());
        receptionist.setPhone(updated.getPhone());
        receptionist.setEmail(updated.getEmail());
        receptionist.setRegistrationNumber(updated.getRegistrationNumber());
        receptionist.setWorkShift(updated.getWorkShift());
        receptionist.setPermissions(updated.getPermissions());

        return repository.save(receptionist);
    }

    public void deleteReceptionist(Long id) {
        repository.deleteById(id);
    }
}
