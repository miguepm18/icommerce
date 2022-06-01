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
@Table(name = "producto")
public class Producto{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    
    @Column(name = "nombre")
    private String nombre;
    
    
    @Column(name = "precio")
    private float precio;
    
    
    @Column(name = "imagen")
    private String imagen;
    
    @Column(name = "activo")
    private Boolean activo;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "producto")
    private List<MenuProducto> menus;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "producto")
    private List<PedidoProducto> pedidos;


    
}
