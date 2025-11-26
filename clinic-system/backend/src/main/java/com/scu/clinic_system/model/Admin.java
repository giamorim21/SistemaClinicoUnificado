package com.scu.clinic_system.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "admins")
public class Admin extends User {
    // Admin herda tudo de User.
    // Se precisar de campo específico (ex: setor), adicione aqui.
}