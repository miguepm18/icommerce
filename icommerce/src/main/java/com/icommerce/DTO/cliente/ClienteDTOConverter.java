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
	
	public ClienteRegistroDTO convertirAClienteRegistroDTO(Cliente cliente) {
		return modelMapper.map(cliente, ClienteRegistroDTO.class);
	}
	
	public Cliente convertirACliente(ClienteRegistroDTO clienteRegistroDTO) {
		return modelMapper.map(clienteRegistroDTO, Cliente.class);
	}
	
	public Cliente convertirACliente(ClienteDTO clientDto) {
		return modelMapper.map(clientDto, Cliente.class);
	}
	public Cliente convertirACliente(ClienteSinRelacionDTO clientDto) {
		return modelMapper.map(clientDto, Cliente.class);
	}

        
}
