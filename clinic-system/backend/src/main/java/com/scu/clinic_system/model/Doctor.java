package com.scu.clinic_system.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "doctors")
public class Doctor extends User {

    @NotBlank(message = "CRM é obrigatório")
    @Column(unique = true) // CRM não pode repetir
    private String crm;

    @NotBlank(message = "Especialidade é obrigatória")
    private String specialty;

    // Getters e Setters
    public String getCrm() { return crm; }
    public void setCrm(String crm) { this.crm = crm; }
    public String getSpecialty() { return specialty; }
    public void setSpecialty(String specialty) { this.specialty = specialty; }
}