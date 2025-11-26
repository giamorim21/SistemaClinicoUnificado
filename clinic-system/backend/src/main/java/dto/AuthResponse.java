package com.scu.clinic_system.dto;

public class AuthResponse {

    private String message;
    private Long pacientId;
    private String fullName;

    // Construtor
    public AuthResponse(String message, Long pacientId, String fullName) {
        this.message = message;
        this.pacientId = pacientId;
        this.fullName = fullName;
    }

    // getters e setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getPacientId() {
        return pacientId;
    }

    public void setPacientId(Long pacientId) {
        this.pacientId = pacientId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
}
