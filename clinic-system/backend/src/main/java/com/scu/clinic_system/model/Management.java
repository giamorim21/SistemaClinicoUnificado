package com.scu.clinic_system.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "management_users") // Nome para evitar conflito com palavras reservadas de SQL
public class Management extends User {
}