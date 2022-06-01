package com.icommerce.DTO.menu;


import lombok.Data;

@Data
public class MenuDTO {

	private Long id;
	private String nombre;
	private Boolean activo;
	private String observaciones;
	//private List<MenuProductoDTO> productos;
}
