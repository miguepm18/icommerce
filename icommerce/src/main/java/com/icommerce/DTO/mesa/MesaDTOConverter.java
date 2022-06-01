package com.icommerce.DTO.mesa;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import com.icommerce.modelo.Mesa;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MesaDTOConverter {

	private final ModelMapper modelMapper = new ModelMapper();
	
	public Mesa convertirAMesa(MesaDTO mesaDto) {
		return modelMapper.map(mesaDto, Mesa.class);
	}
	
	public MesaDTO convertirAMesaDTO(Mesa mesa) {
		return modelMapper.map(mesa, MesaDTO.class);
	}
        
}
