/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.icommerce.modelo;


import java.util.Date;

import java.util.List;



import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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
@Table(name = "pedido")
public class Pedido  {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    
    @Column(name = "tipo")
    private String tipo;
    
    @JsonFormat(pattern="dd-MM-yy HH:mm:ss")
    @Column(name = "hora_entrada")
    private Date horaEntrada;
    
    @JsonFormat(pattern="dd-MM-yy HH:mm:ss")
    @Column(name = "hora_salida")
    private Date horaSalida;
    
    
    @Column(name = "estado")
    private String estado;
    
    @JoinColumn(name = "mesa_id")
    @ManyToOne
    private Mesa mesa;
    
    @Column(name = "activo")
    private Boolean activo;
    
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pedido")
    private List<PedidoProducto> productos;
    
    @JoinColumn(name = "cliente_id")
    @ManyToOne
    private Cliente cliente;
    
    @JoinColumn(name = "empleado_id")
    @ManyToOne
    private Empleado empleado;

    
}
