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
public class PedidoHasMenuPK implements Serializable {

    @Basic(optional = false)
    @Column(name = "id_pedidoFk")
    private int idpedidoFk;
    @Basic(optional = false)
    @Column(name = "id_menuFk")
    private int idmenuFk;

    public PedidoHasMenuPK() {
    }

    public PedidoHasMenuPK(int idpedidoFk, int idmenuFk) {
        this.idpedidoFk = idpedidoFk;
        this.idmenuFk = idmenuFk;
    }

    public int getIdpedidoFk() {
        return idpedidoFk;
    }

    public void setIdpedidoFk(int idpedidoFk) {
        this.idpedidoFk = idpedidoFk;
    }

    public int getIdmenuFk() {
        return idmenuFk;
    }

    public void setIdmenuFk(int idmenuFk) {
        this.idmenuFk = idmenuFk;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) idpedidoFk;
        hash += (int) idmenuFk;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof PedidoHasMenuPK)) {
            return false;
        }
        PedidoHasMenuPK other = (PedidoHasMenuPK) object;
        if (this.idpedidoFk != other.idpedidoFk) {
            return false;
        }
        if (this.idmenuFk != other.idmenuFk) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.icommerce.modelo.PedidoHasMenuPK[ idpedidoFk=" + idpedidoFk + ", idmenuFk=" + idmenuFk + " ]";
    }
    
}
