package com.scu.clinic_system.controller;

import com.scu.clinic_system.model.Pacient;
import com.scu.clinic_system.service.PacientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/pacients")
public class PacientController {

    private final PacientService service;

    public PacientController(PacientService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<Pacient> registerPacient(@Valid @RequestBody Pacient pacient) {
        Pacient created = service.createPacient(pacient);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Pacient> getAllPacients() {
        return service.getAllPacients();
    }

    @GetMapping("/{id}")
    public Pacient getPacient(@PathVariable Long id) {
        return service.getPacientById(id);
    }

    @PutMapping("/{id}")
    public Pacient updatePacient(@PathVariable Long id, @Valid @RequestBody Pacient pacient) {
        return service.updatePacient(id, pacient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePacient(@PathVariable Long id) {
        service.deletePacient(id);
        return ResponseEntity.noContent().build();
    }
}
