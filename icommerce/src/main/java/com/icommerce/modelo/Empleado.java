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
    
    @Column(name = "nombre")
    private String nombre;
    
    @Column(name = "apellidos")
    private String apellidos;
    
    @Column(name = "usuario")
    private String usuario;
    
    @Column(name = "password")
    private String password;
    
    @Column(name = "direccion")
    private String direccion;
    
    @Column(name = "email")
    private String email;
    
    @Column(name = "movil")
    private int movil;
    
    @Column(name = "dni")
    private String dni;
    
    @Column(name = "es_administrador")
    private short esAdministrador;
    
    @Column(name = "es_repartidor")
    private short esRepartidor;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "empleado")
    private Set<Mesa> mesas = new HashSet<>();
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "empleado")
    private Set<Fichaje> fichajes = new HashSet<>();
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "empleado")
    private Set<Pedido> pedidos = new HashSet<>();

  
    
}
