package com.scu.clinic_system.service;

import com.scu.clinic_system.model.Clinic;
import com.scu.clinic_system.repository.ClinicRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManagementService {

    private final ClinicRepository clinicRepository;

    public ManagementService(ClinicRepository clinicRepository) {
        this.clinicRepository = clinicRepository;
    }

    public List<Clinic> listClinics() {
        return clinicRepository.findAll();
    }
}
