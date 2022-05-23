/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.icommerce.modelo;

import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Miguel
 */
@Entity
@Table(name = "fichaje")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Fichaje.findAll", query = "SELECT f FROM Fichaje f"),
    @NamedQuery(name = "Fichaje.findByIdFichaje", query = "SELECT f FROM Fichaje f WHERE f.idFichaje = :idFichaje"),
    @NamedQuery(name = "Fichaje.findByHoraentrada", query = "SELECT f FROM Fichaje f WHERE f.horaentrada = :horaentrada"),
    @NamedQuery(name = "Fichaje.findByHorasalida", query = "SELECT f FROM Fichaje f WHERE f.horasalida = :horasalida")})
public class Fichaje implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_fichaje")
    private Integer idFichaje;
    @Basic(optional = false)
    @Column(name = "Hora_entrada")
    @Temporal(TemporalType.TIMESTAMP)
    private Date horaentrada;
    @Basic(optional = false)
    @Column(name = "Hora_salida")
    @Temporal(TemporalType.TIMESTAMP)
    private Date horasalida;
    @JoinColumn(name = "idEmpleadoFk", referencedColumnName = "id_empleado")
    @ManyToOne(optional = false)
    private Empleado idEmpleadoFk;

    public Fichaje() {
    }

    public Fichaje(Integer idFichaje) {
        this.idFichaje = idFichaje;
    }

    public Fichaje(Integer idFichaje, Date horaentrada, Date horasalida) {
        this.idFichaje = idFichaje;
        this.horaentrada = horaentrada;
        this.horasalida = horasalida;
    }

    public Integer getIdFichaje() {
        return idFichaje;
    }

    public void setIdFichaje(Integer idFichaje) {
        this.idFichaje = idFichaje;
    }

    public Date getHoraentrada() {
        return horaentrada;
    }

    public void setHoraentrada(Date horaentrada) {
        this.horaentrada = horaentrada;
    }

    public Date getHorasalida() {
        return horasalida;
    }

    public void setHorasalida(Date horasalida) {
        this.horasalida = horasalida;
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
        hash += (idFichaje != null ? idFichaje.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Fichaje)) {
            return false;
        }
        Fichaje other = (Fichaje) object;
        if ((this.idFichaje == null && other.idFichaje != null) || (this.idFichaje != null && !this.idFichaje.equals(other.idFichaje))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.icommerce.modelo.Fichaje[ idFichaje=" + idFichaje + " ]";
    }
    
}
