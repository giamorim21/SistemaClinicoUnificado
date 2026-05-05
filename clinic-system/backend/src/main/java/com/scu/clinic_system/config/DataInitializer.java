package com.scu.clinic_system.config;

import com.scu.clinic_system.model.Role;
import com.scu.clinic_system.model.User;
import com.scu.clinic_system.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.email:admin@scu.local}")
    private String adminEmail;

    @Value("${app.admin.password:Admin#123}")
    private String adminPassword;

    @Value("${app.admin.name:Administrador SCU}")
    private String adminName;

    @Value("${app.admin.cpf:00000000000}")
    private String adminCpf;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (userRepository.existsByEmail(adminEmail)) {
            log.info("SCU >> Manager global já existe: {}", adminEmail);
            return;
        }

        User manager = new User();
        manager.setName(adminName);
        manager.setEmail(adminEmail);
        manager.setCpf(adminCpf);
        manager.setBirthDate(LocalDate.of(1990, 1, 1));
        manager.setPassword(passwordEncoder.encode(adminPassword));
        manager.setRole(Role.manager);
        manager.setActive(true);
        userRepository.save(manager);

        log.info("SCU >> Manager global criado automaticamente: {}", adminEmail);
    }
}
