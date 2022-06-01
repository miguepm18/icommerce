/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.icommerce.modelo;

import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

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
    
    
    @Column(name = "dni")
    private String dni;
    
    
    @Column(name = "cuenta_banco")
    private String cuentaBanco;
    
    @JsonFormat(pattern="yyyy-MM-dd")
    @Column(name = "fecha_caducidad_cuenta")
    private Date fechaCaducidadCuenta;
    
    @Column(name = "activo")
    private Boolean activo;
    
    @OneToMany(mappedBy = "cliente")
    private List<Pedido> pedidos;

   
    
}
