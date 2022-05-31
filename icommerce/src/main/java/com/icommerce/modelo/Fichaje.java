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

import lombok.Data;

/**
 *
 * @author Miguel
 */
@Data
@Entity
@Table(name = "fichaje")
public class Fichaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "hora_entrada")
    private Date horaEntrada;
    
    @Column(name = "hora_salida")
    private Date horaSalida;
    
    @ManyToOne
    @JoinColumn(name = "empleado_id")
    private Empleado empleado;

    
}
