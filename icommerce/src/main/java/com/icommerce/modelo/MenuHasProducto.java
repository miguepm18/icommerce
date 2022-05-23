/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.icommerce.modelo;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Miguel
 */
@Entity
@Table(name = "menu_has_producto")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MenuHasProducto.findAll", query = "SELECT m FROM MenuHasProducto m"),
    @NamedQuery(name = "MenuHasProducto.findByIdmenuFk", query = "SELECT m FROM MenuHasProducto m WHERE m.menuHasProductoPK.idmenuFk = :idmenuFk"),
    @NamedQuery(name = "MenuHasProducto.findByIdproductoFk", query = "SELECT m FROM MenuHasProducto m WHERE m.menuHasProductoPK.idproductoFk = :idproductoFk"),
    @NamedQuery(name = "MenuHasProducto.findByCantidad", query = "SELECT m FROM MenuHasProducto m WHERE m.cantidad = :cantidad")})
public class MenuHasProducto implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected MenuHasProductoPK menuHasProductoPK;
    @Basic(optional = false)
    @Column(name = "Cantidad")
    private int cantidad;
    @JoinColumn(name = "id_menuFk", referencedColumnName = "id_menu", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Menu menu;
    @JoinColumn(name = "id_productoFk", referencedColumnName = "id_producto", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Producto producto;

    public MenuHasProducto() {
    }

    public MenuHasProducto(MenuHasProductoPK menuHasProductoPK) {
        this.menuHasProductoPK = menuHasProductoPK;
    }

    public MenuHasProducto(MenuHasProductoPK menuHasProductoPK, int cantidad) {
        this.menuHasProductoPK = menuHasProductoPK;
        this.cantidad = cantidad;
    }

    public MenuHasProducto(int idmenuFk, int idproductoFk) {
        this.menuHasProductoPK = new MenuHasProductoPK(idmenuFk, idproductoFk);
    }

    public MenuHasProductoPK getMenuHasProductoPK() {
        return menuHasProductoPK;
    }

    public void setMenuHasProductoPK(MenuHasProductoPK menuHasProductoPK) {
        this.menuHasProductoPK = menuHasProductoPK;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public Menu getMenu() {
        return menu;
    }

    public void setMenu(Menu menu) {
        this.menu = menu;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (menuHasProductoPK != null ? menuHasProductoPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MenuHasProducto)) {
            return false;
        }
        MenuHasProducto other = (MenuHasProducto) object;
        if ((this.menuHasProductoPK == null && other.menuHasProductoPK != null) || (this.menuHasProductoPK != null && !this.menuHasProductoPK.equals(other.menuHasProductoPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.icommerce.modelo.MenuHasProducto[ menuHasProductoPK=" + menuHasProductoPK + " ]";
    }
    
}
