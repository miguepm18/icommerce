package com.icommerce.DTO.producto;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import com.icommerce.modelo.Producto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ProductoDTOConverter {

	private final ModelMapper modelMapper = new ModelMapper();
	
	public Producto convertirAProducto(ProductoDTO productoDto) {
		return modelMapper.map(productoDto, Producto.class);
	}
	
	public ProductoDTO convertirAProductoDTO(Producto producto) {
		return modelMapper.map(producto, ProductoDTO.class);
	}	

        
}
