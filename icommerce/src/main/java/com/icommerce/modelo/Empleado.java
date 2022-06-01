/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.icommerce.modelo;

import java.util.List;


import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
    
    @Column(name = "activo")
    private Boolean activo;
    
    
    @Column(name = "es_administrador")
    private Boolean esAdministrador;
    
    
    @Column(name = "es_repartidor")
    private Boolean esRepartidor;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "empleado")
    private List<Mesa> mesas;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "empleado")
    private List<Fichaje> fichajes;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "empleado")
    private List<Pedido> pedidos;

  
    
}
