package com.icommerce.DTO.menuProducto;

import com.icommerce.DTO.producto.ProductoDTO;

import lombok.Data;

@Data
public class MenuProductoDTO {

	private Long id;
	private Long menuID;
	private Integer cantidad;
	private ProductoDTO producto;

}
