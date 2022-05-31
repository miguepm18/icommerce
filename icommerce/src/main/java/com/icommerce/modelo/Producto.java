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
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "producto")
    private Set<MenuProducto> menus = new HashSet<>();
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "producto")
    private Set<PedidoProducto> pedidos = new HashSet<>();


    
}
