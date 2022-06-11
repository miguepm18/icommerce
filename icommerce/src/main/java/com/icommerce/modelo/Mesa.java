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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import javax.persistence.OneToMany;
import javax.persistence.Table;


import lombok.Data;


@Data
@Entity
@Table(name = "mesa")
public class Mesa {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    
    @Column(name = "capacidad")
    private int capacidad;
    
    
    @Column(name = "ocupada")
    private Boolean ocupada;
    
    @Column(name = "activo")
    private Boolean activo;
    
    @Column(name = "cuenta")
    private Double cuenta;
    
    @OneToMany(mappedBy = "mesa", cascade = CascadeType.ALL)
    private List<Pedido> pedidos;
    
    @ManyToOne
    @JoinColumn(name = "empleado_id") 
    private Empleado empleado;
    
}
