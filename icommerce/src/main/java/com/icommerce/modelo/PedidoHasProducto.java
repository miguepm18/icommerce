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
@Table(name = "pedido_has_producto")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "PedidoHasProducto.findAll", query = "SELECT p FROM PedidoHasProducto p"),
    @NamedQuery(name = "PedidoHasProducto.findByIdpedidoFk", query = "SELECT p FROM PedidoHasProducto p WHERE p.pedidoHasProductoPK.idpedidoFk = :idpedidoFk"),
    @NamedQuery(name = "PedidoHasProducto.findByIdproductoFk", query = "SELECT p FROM PedidoHasProducto p WHERE p.pedidoHasProductoPK.idproductoFk = :idproductoFk"),
    @NamedQuery(name = "PedidoHasProducto.findByCantidad", query = "SELECT p FROM PedidoHasProducto p WHERE p.cantidad = :cantidad")})
public class PedidoHasProducto implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected PedidoHasProductoPK pedidoHasProductoPK;
    @Basic(optional = false)
    @Column(name = "cantidad")
    private int cantidad;
    @JoinColumn(name = "id_pedidoFk", referencedColumnName = "id_pedido", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Pedido pedido;
    @JoinColumn(name = "id_productoFk", referencedColumnName = "id_producto", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Producto producto;

    public PedidoHasProducto() {
    }

    public PedidoHasProducto(PedidoHasProductoPK pedidoHasProductoPK) {
        this.pedidoHasProductoPK = pedidoHasProductoPK;
    }

    public PedidoHasProducto(PedidoHasProductoPK pedidoHasProductoPK, int cantidad) {
        this.pedidoHasProductoPK = pedidoHasProductoPK;
        this.cantidad = cantidad;
    }

    public PedidoHasProducto(int idpedidoFk, int idproductoFk) {
        this.pedidoHasProductoPK = new PedidoHasProductoPK(idpedidoFk, idproductoFk);
    }

    public PedidoHasProductoPK getPedidoHasProductoPK() {
        return pedidoHasProductoPK;
    }

    public void setPedidoHasProductoPK(PedidoHasProductoPK pedidoHasProductoPK) {
        this.pedidoHasProductoPK = pedidoHasProductoPK;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
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
        hash += (pedidoHasProductoPK != null ? pedidoHasProductoPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof PedidoHasProducto)) {
            return false;
        }
        PedidoHasProducto other = (PedidoHasProducto) object;
        if ((this.pedidoHasProductoPK == null && other.pedidoHasProductoPK != null) || (this.pedidoHasProductoPK != null && !this.pedidoHasProductoPK.equals(other.pedidoHasProductoPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.icommerce.modelo.PedidoHasProducto[ pedidoHasProductoPK=" + pedidoHasProductoPK + " ]";
    }
    
}
