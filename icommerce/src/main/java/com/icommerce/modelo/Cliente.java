/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.icommerce.modelo;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import lombok.Data;

/**
 *
 * @author Miguel
 */
@Data
@Entity
@Table(name = "cliente")
public class Cliente{

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
    @Column(name = "dni")
    private String dni;
    
    @NotNull
    @Column(name = "cuenta_banco")
    private String cuentaBanco;
    
    @Column(name = "fecha_caducidad_cuenta")
    private Date fechaCaducidadCuenta;
    
    @OneToMany(mappedBy = "cliente")
    private Set<Pedido> pedidos = new HashSet<>();

   
    
}
