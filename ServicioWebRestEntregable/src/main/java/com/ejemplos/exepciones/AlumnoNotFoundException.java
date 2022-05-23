package com.ejemplos.exepciones;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class AlumnoNotFoundException extends Exception{

	public AlumnoNotFoundException(String mensaje) {
		super(mensaje);
	}
}
