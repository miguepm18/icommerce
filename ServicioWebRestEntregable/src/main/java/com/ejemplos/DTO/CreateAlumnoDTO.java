package com.ejemplos.DTO;

import com.ejemplos.modelo.Grupo;
import com.ejemplos.modelo.Profesor;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CreateAlumnoDTO {

	private Integer id_alumno;
	private String nombre;
	private String apellidos;
	private Integer id_profesor;
	private Integer id_grupo;
	
}