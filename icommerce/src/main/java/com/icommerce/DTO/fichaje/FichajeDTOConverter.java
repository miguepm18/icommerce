package com.icommerce.DTO.fichaje;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import com.icommerce.modelo.Fichaje;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class FichajeDTOConverter {

	private final ModelMapper modelMapper = new ModelMapper();
	
	public Fichaje convertirAFichaje(FichajeDTO fichajeDto) {
		return modelMapper.map(fichajeDto, Fichaje.class);
	}
	
	public FichajeDTO convertirAFichajeDTO(Fichaje fichaje) {
		return modelMapper.map(fichaje, FichajeDTO.class);
	}
	

        
}
