package com.icommerce.DTO.pedidoProducto;

import com.icommerce.DTO.pedido.PedidoDTO;
import com.icommerce.DTO.producto.ProductoDTO;
import com.icommerce.modelo.Pedido;

import lombok.Data;

@Data
public class PedidoProductoDTO {

	private Long id;
	private Long pedidoID;
	private Integer cantidad;
	private ProductoDTO producto;
}
