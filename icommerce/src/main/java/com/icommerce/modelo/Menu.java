/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.icommerce.modelo;

import java.io.Serializable;
import java.util.List;
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
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Miguel
 */
@Entity
@Table(name = "menu")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Menu.findAll", query = "SELECT m FROM Menu m"),
    @NamedQuery(name = "Menu.findByIdMenu", query = "SELECT m FROM Menu m WHERE m.idMenu = :idMenu"),
    @NamedQuery(name = "Menu.findByNombre", query = "SELECT m FROM Menu m WHERE m.nombre = :nombre"),
    @NamedQuery(name = "Menu.findByPrecio", query = "SELECT m FROM Menu m WHERE m.precio = :precio"),
    @NamedQuery(name = "Menu.findByObservaciones", query = "SELECT m FROM Menu m WHERE m.observaciones = :observaciones")})
public class Menu implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_menu")
    private Integer idMenu;
    @Basic(optional = false)
    @Column(name = "Nombre")
    private String nombre;
    @Basic(optional = false)
    @Column(name = "Precio")
    private String precio;
    @Basic(optional = false)
    @Column(name = "Observaciones")
    private String observaciones;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "menu")
    private List<PedidoHasMenu> pedidoHasMenuList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "menu")
    private List<MenuHasProducto> menuHasProductoList;

    public Menu() {
    }

    public Menu(Integer idMenu) {
        this.idMenu = idMenu;
    }

    public Menu(Integer idMenu, String nombre, String precio, String observaciones) {
        this.idMenu = idMenu;
        this.nombre = nombre;
        this.precio = precio;
        this.observaciones = observaciones;
    }

    public Integer getIdMenu() {
        return idMenu;
    }

    public void setIdMenu(Integer idMenu) {
        this.idMenu = idMenu;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPrecio() {
        return precio;
    }

    public void setPrecio(String precio) {
        this.precio = precio;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    @XmlTransient
    public List<PedidoHasMenu> getPedidoHasMenuList() {
        return pedidoHasMenuList;
    }

    public void setPedidoHasMenuList(List<PedidoHasMenu> pedidoHasMenuList) {
        this.pedidoHasMenuList = pedidoHasMenuList;
    }

    @XmlTransient
    public List<MenuHasProducto> getMenuHasProductoList() {
        return menuHasProductoList;
    }

    public void setMenuHasProductoList(List<MenuHasProducto> menuHasProductoList) {
        this.menuHasProductoList = menuHasProductoList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idMenu != null ? idMenu.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Menu)) {
            return false;
        }
        Menu other = (Menu) object;
        if ((this.idMenu == null && other.idMenu != null) || (this.idMenu != null && !this.idMenu.equals(other.idMenu))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.icommerce.modelo.Menu[ idMenu=" + idMenu + " ]";
    }
    
}
