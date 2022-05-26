package com.icommerce.DTO.cliente;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import com.icommerce.modelo.Cliente;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ClienteDTOConverter {

	private final ModelMapper modelMapper = new ModelMapper();
	
	public ClienteDTO convertirADto(Cliente cliente) {
		return modelMapper.map(cliente, ClienteDTO.class);
	}

        
}
