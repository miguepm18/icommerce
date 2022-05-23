package com.ejemplos.DTO;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.ejemplos.modelo.Alumno;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AlumnoDTOConverter {

	private final ModelMapper modelMapper = new ModelMapper();
	
	public AlumnoDTO convertirADto(Alumno alumno) {
		return modelMapper.map(alumno, AlumnoDTO.class);
	}
	
	public Alumno convertirAAlumno(CreateAlumnoDTO createAlumnoDTO) {
		return modelMapper.map(createAlumnoDTO, Alumno.class);
	}
}
