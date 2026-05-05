package com.scu.clinic_system.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.UUID;

public record ManagerRegistrationRequest(
        @NotBlank(message = "O nome do manager é obrigatório")
        String name,

        @NotBlank(message = "O email do manager é obrigatório")
        @Email(message = "Formato de email inválido")
        String email,

        @NotBlank(message = "A senha é obrigatória")
        String password,

        @NotBlank(message = "O CPF é obrigatório")
        @Size(min = 11, max = 11, message = "CPF deve ter 11 dígitos")
        String cpf,

        @NotBlank(message = "A data de nascimento é obrigatória")
        String birthDate,

        @NotNull(message = "O ID da clínica é obrigatório")
        UUID clinicId
) {}
