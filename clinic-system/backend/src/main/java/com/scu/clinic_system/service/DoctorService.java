package com.scu.clinic_system.service;

import com.scu.clinic_system.model.Doctor;
import com.scu.clinic_system.repository.DoctorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public List<Doctor> findAll() {
        return doctorRepository.findAll();
    }

    public Optional<Doctor> findById(UUID id) {
        return doctorRepository.findById(id);
    }

    public Optional<Doctor> findByUserId(UUID userId) {
        return doctorRepository.findByUserId(userId);
    }
}
