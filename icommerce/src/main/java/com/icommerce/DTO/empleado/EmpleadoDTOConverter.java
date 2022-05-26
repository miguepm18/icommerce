package com.icommerce.DTO.empleado;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import com.icommerce.modelo.Empleado;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EmpleadoDTOConverter {

	private final ModelMapper modelMapper = new ModelMapper();
	
	public EmpleadoDTO convertirADto(Empleado empleado) {
		return modelMapper.map(empleado, EmpleadoDTO.class);
	}
	
	public Empleado convertirAEmpleado(EmpleadoDTO empleadoDTO) {
		return modelMapper.map(empleadoDTO, Empleado.class);
	}
        
}
