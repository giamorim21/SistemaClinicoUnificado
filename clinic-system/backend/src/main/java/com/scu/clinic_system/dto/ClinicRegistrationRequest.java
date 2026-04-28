package com.scu.clinic_system.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ClinicRegistrationRequest(
        @NotBlank(message = "O nome da clínica é obrigatório")
        String clinicName,

        @NotBlank(message = "O CNPJ é obrigatório")
        @Size(min = 14, max = 14, message = "CNPJ deve ter 14 dígitos")
        String cnpj,

        String address,

        String phone,

        @NotBlank(message = "O nome do admin é obrigatório")
        String adminName,

        @NotBlank(message = "O email do admin é obrigatório")
        @Email(message = "Formato de email inválido")
        String adminEmail,

        @NotBlank(message = "A senha do admin é obrigatória")
        String adminPassword,

        @NotBlank(message = "O CPF do admin é obrigatório")
        @Size(min = 11, max = 11, message = "CPF deve ter 11 dígitos")
        String adminCpf,

        @NotBlank(message = "A data de nascimento do admin é obrigatória")
        String adminBirthDate
) {}
