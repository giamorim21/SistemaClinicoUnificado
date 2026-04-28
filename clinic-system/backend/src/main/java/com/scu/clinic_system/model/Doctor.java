package com.scu.clinic_system.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.UUID;

@Entity
@Table(name = "doctor", indexes = {
        @Index(name = "idx_doctor_user_id",       columnList = "user_id",      unique = true),
        @Index(name = "idx_doctor_specialty_id",  columnList = "specialty_id"),
        @Index(name = "idx_doctor_clinic_id",     columnList = "clinic_id"),
        @Index(name = "idx_doctor_council",       columnList = "council_type, council_number, council_state"),
        @Index(name = "idx_doctor_council_status",columnList = "council_status"),
        @Index(name = "idx_doctor_profile",       columnList = "profile_enabled")
})
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "specialty_id", nullable = false)
    private Specialty specialty;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clinic_id", nullable = false)
    private Clinic clinic;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "council_type", nullable = false, length = 20)
    private CouncilType councilType;

    @NotBlank
    @Column(name = "council_number", nullable = false, length = 20)
    private String councilNumber;

    @NotBlank
    @Size(min = 2, max = 2)
    @Column(name = "council_state", nullable = false, length = 2)
    private String councilState;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "council_status", nullable = false, length = 20)
    private CouncilStatus councilStatus = CouncilStatus.active;

    @Column(length = 20)
    private String rqe;

    @Column(columnDefinition = "TEXT")
    private String formation;

    @Column(columnDefinition = "TEXT")
    private String languages;

    @Column(name = "areas_of_practice", length = 500)
    private String areasOfPractice;

    @Column(name = "profile_enabled", nullable = false)
    private boolean profileEnabled = true;

    public UUID getId() { return id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Specialty getSpecialty() { return specialty; }
    public void setSpecialty(Specialty specialty) { this.specialty = specialty; }

    public Clinic getClinic() { return clinic; }
    public void setClinic(Clinic clinic) { this.clinic = clinic; }

    public CouncilType getCouncilType() { return councilType; }
    public void setCouncilType(CouncilType councilType) { this.councilType = councilType; }

    public String getCouncilNumber() { return councilNumber; }
    public void setCouncilNumber(String councilNumber) { this.councilNumber = councilNumber; }

    public String getCouncilState() { return councilState; }
    public void setCouncilState(String councilState) { this.councilState = councilState; }

    public CouncilStatus getCouncilStatus() { return councilStatus; }
    public void setCouncilStatus(CouncilStatus councilStatus) { this.councilStatus = councilStatus; }

    public String getRqe() { return rqe; }
    public void setRqe(String rqe) { this.rqe = rqe; }

    public String getFormation() { return formation; }
    public void setFormation(String formation) { this.formation = formation; }

    public String getLanguages() { return languages; }
    public void setLanguages(String languages) { this.languages = languages; }

    public String getAreasOfPractice() { return areasOfPractice; }
    public void setAreasOfPractice(String areasOfPractice) { this.areasOfPractice = areasOfPractice; }

    public boolean isProfileEnabled() { return profileEnabled; }
    public void setProfileEnabled(boolean profileEnabled) { this.profileEnabled = profileEnabled; }
}
