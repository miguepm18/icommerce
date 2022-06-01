package com.icommerce.modelo;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonFormat;

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
    
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "hora_entrada")
    private Date horaEntrada;
    
    @Column(name = "activo")
    private Boolean activo;
    
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "hora_salida")
    private Date horaSalida;
    
    
    @ManyToOne
    @JoinColumn(name = "empleado_id")
    private Empleado empleado;

    
}
