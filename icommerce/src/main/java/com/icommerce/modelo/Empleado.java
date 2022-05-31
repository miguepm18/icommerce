/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.icommerce.modelo;

import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.Data;

/**
 *
 * @author Miguel
 */
@Data
@Entity
@Table(name = "empleado")
public class Empleado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull
    @Column(name = "nombre")
    private String nombre;
    
    @NotNull
    @Column(name = "apellidos")
    private String apellidos;
    
    @NotNull
    @Column(name = "usuario")
    private String usuario;
    
    @NotNull
    @Column(name = "password")
    private String password;
    
    @NotNull
    @Column(name = "direccion")
    private String direccion;
    
    @NotNull
    @Column(name = "email")
    private String email;
    
    @NotNull
    @Column(name = "movil")
    private int movil;
    
    @NotNull
    @Column(name = "dni")
    private String dni;
    
    @NotNull
    @Column(name = "es_administrador")
    private boolean esAdministrador;
    
    @NotNull
    @Column(name = "es_repartidor")
    private boolean esRepartidor;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "empleado")
    private Set<Mesa> mesas = new HashSet<>();
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "empleado")
    private Set<Fichaje> fichajes = new HashSet<>();
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "empleado")
    private Set<Pedido> pedidos = new HashSet<>();

  
    
}
