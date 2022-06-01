package com.icommerce.DTO.pedido;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import com.icommerce.modelo.Pedido;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class PedidoDTOConverter {

	private final ModelMapper modelMapper = new ModelMapper();
	
	public PedidoDTO convertirADto(Pedido pedido) {
		return modelMapper.map(pedido, PedidoDTO.class);
	}
	
	public Pedido convertirAPedido(PedidoDTO pedidoDTO) {
		return modelMapper.map(pedidoDTO, Pedido.class);
	}
        
}
