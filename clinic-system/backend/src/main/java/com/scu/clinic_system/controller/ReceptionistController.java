package com.scu.clinic_system.controller;

import com.scu.clinic_system.model.Role;
import com.scu.clinic_system.model.User;
import com.scu.clinic_system.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/receptionists")
@PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
public class ReceptionistController {

    private final UserRepository users;

    public ReceptionistController(UserRepository users) {
        this.users = users;
    }

    @GetMapping
    public List<User> listReceptionists() {
        return users.findAll().stream()
                .filter(u -> u.getRole() == Role.receptionist)
                .toList();
    }
}
