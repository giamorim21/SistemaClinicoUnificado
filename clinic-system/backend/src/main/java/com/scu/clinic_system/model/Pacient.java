package com.scu.clinic_system.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.time.LocalDate;

@Entity
@Table(name = "pacients")
public class Pacient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // (11) Nome completo - NOT NULL
    @NotBlank
    @Column(nullable = false)
    private String fullName;

    // (4) Data de nascimento - NOT NULL
    @Past
    @NotNull
    @Column(nullable = false)
    private LocalDate birthDate;

    // (2) Idade - NOT NULL
    @NotNull
    @Min(0)
    @Column(nullable = false)
    private Integer age;

    // (12) Gênero - NOT NULL
    @NotBlank
    @Column(nullable = false)
    private String gender;

    // (20) Foto - NULL
    private String photoUrl;

    // (8) CPF - NOT NULL + único
    @NotBlank
    @Column(nullable = false, unique = true)
    private String cpf;

    // (15) RG - NULL (hash)
    private String identity;

    // (17) Nacionalidade - NOT NULL
    @NotBlank
    @Column(nullable = false)
    private String nationality;

    // (1) Endereço - NOT NULL
    @NotBlank
    @Column(nullable = false)
    private String address;

    // (19) Telefone - NULL
    @Pattern(regexp = "\\d{10,11}")
    private String phone;

    // (9) Email - NULL
    @Email
    private String email;

    // (14) Plano de saúde - NULL
    private String healthPlan;

    // (22) Número do plano - NULL
    private String planNumber;

    // (23) Validade do plano - NULL
    private LocalDate planValidity;

    // (21) Titular do plano - NULL
    private String planHolder;

    // (10) Nome do pai - NULL
    private String fatherName;

    // (16) Nome da mãe - NULL
    private String motherName;

    // (18) Ocupação - RETIRAR (campo removido)
    // private String occupation;

    // (24) Tipo sanguíneo - NULL
    private String bloodType;

    // (5) CNS - NULL
    private String cns;

    // (25) Método de pagamento - RETIRAR
    // private String preferredPaymentMethod;

    // (13) Nome do guardião legal - NULL
    private String guardianName;

    // (3) Alergias - NULL
    private String allergies;

    // (18) Senha - NOT NULL
    @NotBlank
    @Column(nullable = false)
    private String password;

    // (6) Consentimento - NOT NULL
    @NotNull
    @Column(nullable = false)
    private Boolean consent;

    // (7) Data de consentimento - NOT NULL
    @NotNull
    @Column(nullable = false)
    private LocalDate consentDate;

    // ==========================
    // Getters e Setters
    // ==========================

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }

    public void setFullName(String fullName) { this.fullName = fullName; }

    public LocalDate getBirthDate() { return birthDate; }

    public void setBirthDate(LocalDate birthDate) { this.birthDate = birthDate; }

    public Integer getAge() { return age; }

    public void setAge(Integer age) { this.age = age; }

    public String getGender() { return gender; }

    public void setGender(String gender) { this.gender = gender; }

    public String getPhotoUrl() { return photoUrl; }

    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }

    public String getCpf() { return cpf; }

    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getIdentity() { return identity; }

    public void setIdentity(String identity) { this.identity = identity; }

    public String getNationality() { return nationality; }

    public void setNationality(String nationality) { this.nationality = nationality; }

    public String getAddress() { return address; }

    public void setAddress(String address) { this.address = address; }

    public String getPhone() { return phone; }

    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getHealthPlan() { return healthPlan; }

    public void setHealthPlan(String healthPlan) { this.healthPlan = healthPlan; }

    public String getPlanNumber() { return planNumber; }

    public void setPlanNumber(String planNumber) { this.planNumber = planNumber; }

    public LocalDate getPlanValidity() { return planValidity; }

    public void setPlanValidity(LocalDate planValidity) { this.planValidity = planValidity; }

    public String getPlanHolder() { return planHolder; }

    public void setPlanHolder(String planHolder) { this.planHolder = planHolder; }

    public String getFatherName() { return fatherName; }

    public void setFatherName(String fatherName) { this.fatherName = fatherName; }

    public String getMotherName() { return motherName; }

    public void setMotherName(String motherName) { this.motherName = motherName; }

    public String getBloodType() { return bloodType; }

    public void setBloodType(String bloodType) { this.bloodType = bloodType; }

    public String getCns() { return cns; }

    public void setCns(String cns) { this.cns = cns; }

    public String getGuardianName() { return guardianName; }

    public void setGuardianName(String guardianName) { this.guardianName = guardianName; }

    public String getAllergies() { return allergies; }

    public void setAllergies(String allergies) { this.allergies = allergies; }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }

    public Boolean getConsent() { return consent; }

    public void setConsent(Boolean consent) { this.consent = consent; }

    public LocalDate getConsentDate() { return consentDate; }

    public void setConsentDate(LocalDate consentDate) { this.consentDate = consentDate; }

}
