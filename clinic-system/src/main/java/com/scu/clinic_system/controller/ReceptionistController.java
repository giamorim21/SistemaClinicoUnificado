package com.scu.clinic_system.controller;

import com.scu.clinic_system.model.Receptionist;
import com.scu.clinic_system.service.ReceptionistService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/receptionists")
public class ReceptionistController {

    private final ReceptionistService service;

    public ReceptionistController(ReceptionistService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<Receptionist> registerReceptionist(@Valid @RequestBody Receptionist receptionist) {
        Receptionist created = service.createReceptionist(receptionist);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Receptionist> getAllReceptionists() {
        return service.getAllReceptionists();
    }

    @GetMapping("/{id}")
    public Receptionist getReceptionist(@PathVariable Long id) {
        return service.getReceptionistById(id);
    }

    @PutMapping("/{id}")
    public Receptionist updateReceptionist(@PathVariable Long id, @Valid @RequestBody Receptionist receptionist) {
        return service.updateReceptionist(id, receptionist);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReceptionist(@PathVariable Long id) {
        service.deleteReceptionist(id);
        return ResponseEntity.noContent().build();
    }
}
