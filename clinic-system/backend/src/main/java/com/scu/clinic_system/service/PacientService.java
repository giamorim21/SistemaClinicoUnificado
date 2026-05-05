package com.scu.clinic_system.service;

import com.scu.clinic_system.model.Role;
import com.scu.clinic_system.model.User;
import com.scu.clinic_system.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PacientService {

    private final UserRepository userRepository;

    public PacientService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findAll() {
        return userRepository.findAll().stream()
                .filter(u -> u.getRole() == Role.patient)
                .toList();
    }

    public Optional<User> findById(UUID id) {
        return userRepository.findById(id)
                .filter(u -> u.getRole() == Role.patient);
    }
}
