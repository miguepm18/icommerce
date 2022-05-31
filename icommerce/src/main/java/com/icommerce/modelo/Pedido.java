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
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


import lombok.Data;

/**
 *
 * @author Miguel
 */
@Data
@Entity
@Table(name = "pedido")
public class Pedido  {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "tipo")
    private String tipo;
    
    @Column(name = "hora_entrada")
    private Date horaEntrada;
    
    @Column(name = "hora_salida")
    private Date horaSalida;
    
    @Column(name = "estado")
    private String estado;
    
    
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    private Set<Mesa> mesas = new HashSet<>();
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pedido")
    private Set<PedidoProducto> productos = new HashSet<>();
    
    @JoinColumn(name = "cliente_id")
    @ManyToOne
    private Cliente cliente;
    
    @JoinColumn(name = "empleado_id")
    @ManyToOne
    private Empleado empleado;

    
}
