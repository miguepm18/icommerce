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
public class PedidoHasProductoPK implements Serializable {

    @Basic(optional = false)
    @Column(name = "id_pedidoFk")
    private int idpedidoFk;
    @Basic(optional = false)
    @Column(name = "id_productoFk")
    private int idproductoFk;

    public PedidoHasProductoPK() {
    }

    public PedidoHasProductoPK(int idpedidoFk, int idproductoFk) {
        this.idpedidoFk = idpedidoFk;
        this.idproductoFk = idproductoFk;
    }

    public int getIdpedidoFk() {
        return idpedidoFk;
    }

    public void setIdpedidoFk(int idpedidoFk) {
        this.idpedidoFk = idpedidoFk;
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
        hash += (int) idpedidoFk;
        hash += (int) idproductoFk;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof PedidoHasProductoPK)) {
            return false;
        }
        PedidoHasProductoPK other = (PedidoHasProductoPK) object;
        if (this.idpedidoFk != other.idpedidoFk) {
            return false;
        }
        if (this.idproductoFk != other.idproductoFk) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.icommerce.modelo.PedidoHasProductoPK[ idpedidoFk=" + idpedidoFk + ", idproductoFk=" + idproductoFk + " ]";
    }
    
}
