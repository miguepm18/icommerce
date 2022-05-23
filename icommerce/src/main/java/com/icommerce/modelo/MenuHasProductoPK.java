/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.icommerce.modelo;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 *
 * @author Miguel
 */
@Embeddable
public class MenuHasProductoPK implements Serializable {

    @Basic(optional = false)
    @Column(name = "id_menuFk")
    private int idmenuFk;
    @Basic(optional = false)
    @Column(name = "id_productoFk")
    private int idproductoFk;

    public MenuHasProductoPK() {
    }

    public MenuHasProductoPK(int idmenuFk, int idproductoFk) {
        this.idmenuFk = idmenuFk;
        this.idproductoFk = idproductoFk;
    }

    public int getIdmenuFk() {
        return idmenuFk;
    }

    public void setIdmenuFk(int idmenuFk) {
        this.idmenuFk = idmenuFk;
    }

    public int getIdproductoFk() {
        return idproductoFk;
    }

    public void setIdproductoFk(int idproductoFk) {
        this.idproductoFk = idproductoFk;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) idmenuFk;
        hash += (int) idproductoFk;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MenuHasProductoPK)) {
            return false;
        }
        MenuHasProductoPK other = (MenuHasProductoPK) object;
        if (this.idmenuFk != other.idmenuFk) {
            return false;
        }
        if (this.idproductoFk != other.idproductoFk) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.icommerce.modelo.MenuHasProductoPK[ idmenuFk=" + idmenuFk + ", idproductoFk=" + idproductoFk + " ]";
    }
    
}
