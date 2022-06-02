package com.icommerce.DTO.producto;


import lombok.Data;

@Data
public class ProductoDTO {
	private Long id;
	private String nombre;
	private float precio;
	private String imagen;
	private Boolean activo;
	
}
