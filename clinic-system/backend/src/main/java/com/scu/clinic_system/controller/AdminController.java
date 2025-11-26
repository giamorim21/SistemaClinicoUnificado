package com.scu.clinic_system.controller;

import com.scu.clinic_system.model.*;
import com.scu.clinic_system.repository.*;
import org.springframework.security.core.Authentication; // Importante
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import jakarta.validation.Valid;

import java.util.Set;

@RestController
@RequestMapping("/api/admin")
// @PreAuthorize("hasRole('ADMIN')") -> Já está no SecurityConfig, mas ok manter
public class AdminController {

    private final PasswordEncoder encoder;
    private final DoctorRepository doctors;
    private final ReceptionistRepository receptionists;
    private final UserRepository users; // Para buscar o admin logado

    public AdminController(PasswordEncoder encoder, UserRepository users, DoctorRepository doctors, ReceptionistRepository receptionists) {
        this.encoder = encoder;
        this.users = users;
        this.doctors = doctors;
        this.receptionists = receptionists;
    }

    // Método auxiliar para pegar o Admin que está fazendo a requisição
    private User getLoggedAdmin() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName(); // O username no seu UserDetails é o email
        return users.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Admin não encontrado"));
    }

    @PostMapping("/staff/doctor")
    public Doctor createDoctor(@Valid @RequestBody Doctor d) {
        // 1. Descobrir quem é o Admin logado e qual sua clínica
        User admin = getLoggedAdmin();

        if (admin.getClinic() == null) {
            throw new RuntimeException("Este Admin não está vinculado a nenhuma clínica!");
        }

        // 2. Verificar se o CRM já existe (Opcional, mas recomendado para erro amigável)
        // Se quiser usar isso, precisa criar o método existsByCrm no DoctorRepository
        // if (doctors.existsByCrm(d.getCrm())) {
        //    throw new RuntimeException("Já existe um médico com este CRM.");
        // }

        // 3. Preparar o Médico
        // O CRM e a Especialidade JÁ VIERAM preenchidos dentro de 'd' pelo @RequestBody
        d.setPassword(encoder.encode(d.getPassword()));
        d.setRoles(Set.of(Role.ROLE_DOCTOR));

        // 4. SEGURANÇA: Forçar o médico a ser da mesma clínica do Admin
        d.setClinic(admin.getClinic());

        return doctors.save(d);
    }

    @PostMapping("/staff/receptionist")
    public Receptionist createReceptionist(@Valid @RequestBody Receptionist r) {
        User admin = getLoggedAdmin();

        if (admin.getClinic() == null) {
            throw new RuntimeException("Este Admin não está vinculado a nenhuma clínica!");
        }

        r.setPassword(encoder.encode(r.getPassword()));
        r.setRoles(Set.of(Role.ROLE_RECEPTIONIST));

        // SEGURANÇA: Vincula à mesma clínica
        r.setClinic(admin.getClinic());

        return receptionists.save(r);
    }
}