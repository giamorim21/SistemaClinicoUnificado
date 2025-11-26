package com.scu.clinic_system.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
// Se não tiver a biblioteca do Hibernate Validator BR, remova a anotação @CNPJ abaixo
// import org.hibernate.validator.constraints.br.CNPJ;

public record ClinicRegistrationRequest(
        @NotBlank(message = "O nome da clínica é obrigatório")
        String clinicName,

        @NotBlank(message = "O CNPJ é obrigatório")
        // @CNPJ(message = "CNPJ inválido") // Descomente se tiver a dependência
        String cnpj,

        @NotBlank(message = "O endereço é obrigatório")
        String address,

        @NotBlank(message = "O nome do admin é obrigatório")
        String adminName,

        @NotBlank(message = "O email do admin é obrigatório")
        @Email(message = "Formato de email inválido")
        String adminEmail,

        @NotBlank(message = "A senha do admin é obrigatória")
        String adminPassword
) {}