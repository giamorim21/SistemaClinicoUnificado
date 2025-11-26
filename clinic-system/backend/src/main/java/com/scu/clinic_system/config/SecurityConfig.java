// com/scu/clinic_system/config/SecurityConfig.java
package com.scu.clinic_system.config;

import com.scu.clinic_system.repository.UserRepository;
import com.scu.clinic_system.security.JwtAuthenticationFilter;
import com.scu.clinic_system.security.JwtService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
@EnableMethodSecurity // habilita @PreAuthorize
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }

    @Bean
    public UserDetailsService userDetailsService(UserRepository repo) {
        return username -> repo.findByEmail(username)
                .map(u -> User.builder()
                        .username(u.getEmail())
                        .password(u.getPassword())
                        .authorities(u.getRoles().stream().map(Enum::name).toArray(String[]::new))
                        .accountLocked(!u.isEnabled())
                        .build())
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
    }

    @Bean
    public AuthenticationManager authManager(UserDetailsService uds, PasswordEncoder enc) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(uds);
        provider.setPasswordEncoder(enc);
        return new ProviderManager(provider);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, JwtService jwt, UserRepository repo) throws Exception {
        http
                .cors(Customizer.withDefaults()) // <--- ADICIONE ISSO AQUI (Linha vital)
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(new JwtAuthenticationFilter(jwt, repo), org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(auth -> auth
                        // === ÁREA PÚBLICA ===
                        .requestMatchers("/api/auth/login").permitAll()
                        .requestMatchers("/api/pacients/register").permitAll()

                        // ADICIONE ESTA LINHA ABAIXO:
                        .requestMatchers("/api/auth/seed-manager").permitAll()

                        // === ÁREA RESTRITA ===
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/doctor/**").hasRole("DOCTOR")
                        .requestMatchers("/api/reception/**").hasRole("RECEPTIONIST")
                        .requestMatchers("/api/management/**").hasRole("MANAGEMENT")
                        .requestMatchers("/api/pacients/**").hasAnyRole("PATIENT","ADMIN")
                        .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults());
        return http.build();
    }
}
