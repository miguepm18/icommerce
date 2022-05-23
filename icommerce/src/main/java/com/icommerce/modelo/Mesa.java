/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.icommerce.modelo;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Table(name = "mesa")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Mesa.findAll", query = "SELECT m FROM Mesa m"),
    @NamedQuery(name = "Mesa.findByIdMesa", query = "SELECT m FROM Mesa m WHERE m.idMesa = :idMesa"),
    @NamedQuery(name = "Mesa.findByCapacidad", query = "SELECT m FROM Mesa m WHERE m.capacidad = :capacidad"),
    @NamedQuery(name = "Mesa.findByOcupada", query = "SELECT m FROM Mesa m WHERE m.ocupada = :ocupada"),
    @NamedQuery(name = "Mesa.findByCuenta", query = "SELECT m FROM Mesa m WHERE m.cuenta = :cuenta")})
public class Mesa implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_mesa")
    private Integer idMesa;
    @Basic(optional = false)
    @Column(name = "Capacidad")
    private int capacidad;
    @Basic(optional = false)
    @Column(name = "Ocupada")
    private short ocupada;
    @Basic(optional = false)
    @Column(name = "Cuenta")
    private float cuenta;
    @JoinColumn(name = "idEmpleadoFk", referencedColumnName = "id_empleado")
    @ManyToOne
    private Empleado idEmpleadoFk;
    @JoinColumn(name = "idPedidoFk", referencedColumnName = "id_pedido")
    @ManyToOne(optional = false)
    private Pedido idPedidoFk;

    public Mesa() {
    }

    public Mesa(Integer idMesa) {
        this.idMesa = idMesa;
    }

    public Mesa(Integer idMesa, int capacidad, short ocupada, float cuenta) {
        this.idMesa = idMesa;
        this.capacidad = capacidad;
        this.ocupada = ocupada;
        this.cuenta = cuenta;
    }

    public Integer getIdMesa() {
        return idMesa;
    }

    public void setIdMesa(Integer idMesa) {
        this.idMesa = idMesa;
    }

    public int getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(int capacidad) {
        this.capacidad = capacidad;
    }

    public short getOcupada() {
        return ocupada;
    }

    public void setOcupada(short ocupada) {
        this.ocupada = ocupada;
    }

    public float getCuenta() {
        return cuenta;
    }

    public void setCuenta(float cuenta) {
        this.cuenta = cuenta;
    }

    public Empleado getIdEmpleadoFk() {
        return idEmpleadoFk;
    }

    public void setIdEmpleadoFk(Empleado idEmpleadoFk) {
        this.idEmpleadoFk = idEmpleadoFk;
    }

    public Pedido getIdPedidoFk() {
        return idPedidoFk;
    }

    public void setIdPedidoFk(Pedido idPedidoFk) {
        this.idPedidoFk = idPedidoFk;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idMesa != null ? idMesa.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Mesa)) {
            return false;
        }
        Mesa other = (Mesa) object;
        if ((this.idMesa == null && other.idMesa != null) || (this.idMesa != null && !this.idMesa.equals(other.idMesa))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.icommerce.modelo.Mesa[ idMesa=" + idMesa + " ]";
    }
    
}
