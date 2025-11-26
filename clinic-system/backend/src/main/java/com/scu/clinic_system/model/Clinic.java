package com.scu.clinic_system.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Table(name = "clinics")
public class Clinic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String cnpj;

    private String address;

    // Opcional: Lista de usuários para navegação reversa, mas cuidado com performance
    // @OneToMany(mappedBy = "clinic")
    // private List<User> users;

    // Getters e Setters padrão
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCnpj() { return cnpj; }
    public void setCnpj(String cnpj) { this.cnpj = cnpj; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}