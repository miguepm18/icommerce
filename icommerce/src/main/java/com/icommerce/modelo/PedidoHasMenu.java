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
@Table(name = "pedido_has_menu")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "PedidoHasMenu.findAll", query = "SELECT p FROM PedidoHasMenu p"),
    @NamedQuery(name = "PedidoHasMenu.findByIdpedidoFk", query = "SELECT p FROM PedidoHasMenu p WHERE p.pedidoHasMenuPK.idpedidoFk = :idpedidoFk"),
    @NamedQuery(name = "PedidoHasMenu.findByIdmenuFk", query = "SELECT p FROM PedidoHasMenu p WHERE p.pedidoHasMenuPK.idmenuFk = :idmenuFk"),
    @NamedQuery(name = "PedidoHasMenu.findByCantidad", query = "SELECT p FROM PedidoHasMenu p WHERE p.cantidad = :cantidad")})
public class PedidoHasMenu implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected PedidoHasMenuPK pedidoHasMenuPK;
    @Basic(optional = false)
    @Column(name = "cantidad")
    private int cantidad;
    @JoinColumn(name = "id_menuFk", referencedColumnName = "id_menu", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Menu menu;
    @JoinColumn(name = "id_pedidoFk", referencedColumnName = "id_pedido", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Pedido pedido;

    public PedidoHasMenu() {
    }

    public PedidoHasMenu(PedidoHasMenuPK pedidoHasMenuPK) {
        this.pedidoHasMenuPK = pedidoHasMenuPK;
    }

    public PedidoHasMenu(PedidoHasMenuPK pedidoHasMenuPK, int cantidad) {
        this.pedidoHasMenuPK = pedidoHasMenuPK;
        this.cantidad = cantidad;
    }

    public PedidoHasMenu(int idpedidoFk, int idmenuFk) {
        this.pedidoHasMenuPK = new PedidoHasMenuPK(idpedidoFk, idmenuFk);
    }

    public PedidoHasMenuPK getPedidoHasMenuPK() {
        return pedidoHasMenuPK;
    }

    public void setPedidoHasMenuPK(PedidoHasMenuPK pedidoHasMenuPK) {
        this.pedidoHasMenuPK = pedidoHasMenuPK;
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

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (pedidoHasMenuPK != null ? pedidoHasMenuPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof PedidoHasMenu)) {
            return false;
        }
        PedidoHasMenu other = (PedidoHasMenu) object;
        if ((this.pedidoHasMenuPK == null && other.pedidoHasMenuPK != null) || (this.pedidoHasMenuPK != null && !this.pedidoHasMenuPK.equals(other.pedidoHasMenuPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.icommerce.modelo.PedidoHasMenu[ pedidoHasMenuPK=" + pedidoHasMenuPK + " ]";
    }
    
}
