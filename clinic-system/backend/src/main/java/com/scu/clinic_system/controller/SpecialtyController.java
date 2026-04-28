package com.scu.clinic_system.controller;

import com.scu.clinic_system.model.Specialty;
import com.scu.clinic_system.repository.SpecialtyRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/specialties")
public class SpecialtyController {

    private final SpecialtyRepository specialties;

    public SpecialtyController(SpecialtyRepository specialties) {
        this.specialties = specialties;
    }

    @GetMapping
    public List<Specialty> listAll() {
        return specialties.findAll();
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<?> create(@Valid @RequestBody Specialty specialty) {
        if (specialties.existsByName(specialty.getName()))
            return ResponseEntity.badRequest().body("Especialidade já cadastrada.");
        return ResponseEntity.ok(specialties.save(specialty));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        specialties.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
