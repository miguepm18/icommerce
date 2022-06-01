package com.icommerce.DTO.fichaje;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class FichajeDTO {

	private Long id;
	@JsonFormat(pattern="dd-MM-yy HH:mm:ss")
	private Date horaEntrada;
	private Boolean activo;
	@JsonFormat(pattern="dd-MM-yy HH:mm:ss")
	private Date horaSalida;
	private Long empleadoID;
}
