package com.ejemplos.DTO;

import com.ejemplos.modelo.Grupo;
import com.ejemplos.modelo.Profesor;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AlumnoDTO {

	private int id_alumno;
	private String nombre;
	private String apellidos;
}
