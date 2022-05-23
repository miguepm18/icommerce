package com.ejemplos.modelo;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
@Entity
public class Alumno {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(name="id_alumno")
	private int id_alumno;
	
	@Column(name="nombre")
	private String nombre;
	
	@Column(name="apellidos")
	private String apellidos;
	
	@ManyToOne
	@JoinColumn(name="id_profesor")
	private Profesor id_profesor;
	
	@ManyToOne
	@JoinColumn(name="id_grupo")
	private Grupo id_grupo;
	
	
}
