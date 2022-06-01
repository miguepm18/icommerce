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
@Table(name = "menu")
public class Menu{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    
    @Column(name = "nombre")
    private String nombre;
    
    @Column(name = "activo")
    private Boolean activo;
    
    @Column(name = "observaciones")
    private String observaciones;
        
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "menu")
    private List<MenuProducto> productos;

    
}
