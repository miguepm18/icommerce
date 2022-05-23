package com.ejemplos.exepciones;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ApiError {

private HttpStatus estado;
	
	@JsonFormat(shape = Shape.STRING, pattern = "dd/MM/yyyy hh:mm:ss")
	
	private LocalDateTime fecha;
	
	private String mensaje;

	public void setEstado(HttpStatus estado) {
		this.estado=estado;
	}

	public void setFecha(LocalDateTime now) {
		this.fecha=now;
		
	}

	public void setMensaje(String message) {
		this.mensaje=message;
		
	}
	
	
}
