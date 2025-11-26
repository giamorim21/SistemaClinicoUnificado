package com.scu.clinic_system.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Entity
@Table(name = "receptionists")
public class Receptionist extends User {

    // REMOVIDO: private Long id; (Já herda de User)
    // REMOVIDO: private String email; (Já herda de User)

    @NotBlank
    private String fullName;

    @NotBlank
    @Pattern(regexp = "\\d{11}", message = "CPF must have 11 numeric digits")
    @Column(unique = true)
    private String cpf;

    @Past
    private LocalDate birthDate;

    @NotBlank
    private String gender;

    private String address;

    @Pattern(regexp = "\\d{10,11}")
    private String phone;

    @NotBlank
    private String registrationNumber; // Matricula

    @NotBlank
    private String workShift; // Turno

    private String permissions;

    // Getters e Setters (Apenas dos campos novos)

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public LocalDate getBirthDate() { return birthDate; }
    public void setBirthDate(LocalDate birthDate) { this.birthDate = birthDate; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getRegistrationNumber() { return registrationNumber; }
    public void setRegistrationNumber(String registrationNumber) { this.registrationNumber = registrationNumber; }

    public String getWorkShift() { return workShift; }
    public void setWorkShift(String workShift) { this.workShift = workShift; }

    public String getPermissions() { return permissions; }
    public void setPermissions(String permissions) { this.permissions = permissions; }
}