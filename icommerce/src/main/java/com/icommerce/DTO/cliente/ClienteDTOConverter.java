package com.icommerce.DTO.cliente;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import com.icommerce.modelo.Cliente;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ClienteDTOConverter {

	private final ModelMapper modelMapper = new ModelMapper();
	
	public ClienteDTO convertirAClienteDTO(Cliente cliente) {
		return modelMapper.map(cliente, ClienteDTO.class);
	}
	
	public Cliente convertirACliente(ClienteDTO clientDto) {
		return modelMapper.map(clientDto, Cliente.class);
	}

        
}
