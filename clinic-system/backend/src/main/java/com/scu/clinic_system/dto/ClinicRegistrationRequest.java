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
        
        java.util.UUID parentClinicId
) {}
