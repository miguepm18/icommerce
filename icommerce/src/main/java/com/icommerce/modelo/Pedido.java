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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "pedido")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Pedido.findAll", query = "SELECT p FROM Pedido p"),
    @NamedQuery(name = "Pedido.findByIdPedido", query = "SELECT p FROM Pedido p WHERE p.idPedido = :idPedido"),
    @NamedQuery(name = "Pedido.findByTipo", query = "SELECT p FROM Pedido p WHERE p.tipo = :tipo"),
    @NamedQuery(name = "Pedido.findByHoraentrada", query = "SELECT p FROM Pedido p WHERE p.horaentrada = :horaentrada"),
    @NamedQuery(name = "Pedido.findByHorasalida", query = "SELECT p FROM Pedido p WHERE p.horasalida = :horasalida"),
    @NamedQuery(name = "Pedido.findByEstado", query = "SELECT p FROM Pedido p WHERE p.estado = :estado"),
    @NamedQuery(name = "Pedido.findByPreciopedido", query = "SELECT p FROM Pedido p WHERE p.preciopedido = :preciopedido")})
public class Pedido implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_pedido")
    private Integer idPedido;
    @Basic(optional = false)
    @Column(name = "Tipo")
    private String tipo;
    @Basic(optional = false)
    @Column(name = "Hora_entrada")
    private String horaentrada;
    @Basic(optional = false)
    @Column(name = "Hora_salida")
    private String horasalida;
    @Basic(optional = false)
    @Column(name = "Estado")
    private String estado;
    @Basic(optional = false)
    @Column(name = "Precio_pedido")
    private float preciopedido;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pedido")
    private List<PedidoHasMenu> pedidoHasMenuList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idPedidoFk")
    private List<Mesa> mesaList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pedido")
    private List<PedidoHasProducto> pedidoHasProductoList;
    @JoinColumn(name = "idClienteFk", referencedColumnName = "id_cliente")
    @ManyToOne
    private Cliente idClienteFk;
    @JoinColumn(name = "idEmpleadoFk", referencedColumnName = "id_empleado")
    @ManyToOne
    private Empleado idEmpleadoFk;

    public Pedido() {
    }

    public Pedido(Integer idPedido) {
        this.idPedido = idPedido;
    }

    public Pedido(Integer idPedido, String tipo, String horaentrada, String horasalida, String estado, float preciopedido) {
        this.idPedido = idPedido;
        this.tipo = tipo;
        this.horaentrada = horaentrada;
        this.horasalida = horasalida;
        this.estado = estado;
        this.preciopedido = preciopedido;
    }

    public Integer getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(Integer idPedido) {
        this.idPedido = idPedido;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getHoraentrada() {
        return horaentrada;
    }

    public void setHoraentrada(String horaentrada) {
        this.horaentrada = horaentrada;
    }

    public String getHorasalida() {
        return horasalida;
    }

    public void setHorasalida(String horasalida) {
        this.horasalida = horasalida;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public float getPreciopedido() {
        return preciopedido;
    }

    public void setPreciopedido(float preciopedido) {
        this.preciopedido = preciopedido;
    }

    @XmlTransient
    public List<PedidoHasMenu> getPedidoHasMenuList() {
        return pedidoHasMenuList;
    }

    public void setPedidoHasMenuList(List<PedidoHasMenu> pedidoHasMenuList) {
        this.pedidoHasMenuList = pedidoHasMenuList;
    }

    @XmlTransient
    public List<Mesa> getMesaList() {
        return mesaList;
    }

    public void setMesaList(List<Mesa> mesaList) {
        this.mesaList = mesaList;
    }

    @XmlTransient
    public List<PedidoHasProducto> getPedidoHasProductoList() {
        return pedidoHasProductoList;
    }

    public void setPedidoHasProductoList(List<PedidoHasProducto> pedidoHasProductoList) {
        this.pedidoHasProductoList = pedidoHasProductoList;
    }

    public Cliente getIdClienteFk() {
        return idClienteFk;
    }

    public void setIdClienteFk(Cliente idClienteFk) {
        this.idClienteFk = idClienteFk;
    }

    public Empleado getIdEmpleadoFk() {
        return idEmpleadoFk;
    }

    public void setIdEmpleadoFk(Empleado idEmpleadoFk) {
        this.idEmpleadoFk = idEmpleadoFk;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idPedido != null ? idPedido.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Pedido)) {
            return false;
        }
        Pedido other = (Pedido) object;
        if ((this.idPedido == null && other.idPedido != null) || (this.idPedido != null && !this.idPedido.equals(other.idPedido))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.icommerce.modelo.Pedido[ idPedido=" + idPedido + " ]";
    }
    
}
