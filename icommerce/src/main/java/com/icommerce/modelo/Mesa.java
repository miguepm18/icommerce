/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.icommerce.modelo;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.Data;


@Data
@Entity
@Table(name = "mesa")
public class Mesa {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull
    @Column(name = "capacidad")
    private int capacidad;
    
    @NotNull
    @Column(name = "ocupada")
    private short ocupada;
    
    @ManyToOne
    @JoinColumn(name = "empleado_id") 
    private Empleado empleado;
    
    @JoinColumn(name = "pedido_id")
    @ManyToOne
    private Pedido pedido;
}
