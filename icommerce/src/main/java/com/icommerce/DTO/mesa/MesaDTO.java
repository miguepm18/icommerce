package com.icommerce.DTO.mesa;

import java.util.List;

import com.icommerce.DTO.empleado.EmpleadoDTO;
import com.icommerce.DTO.pedido.PedidoDTO;

import lombok.Data;

@Data
public class MesaDTO {

	private Long id;
	private int capacidad;
	private Boolean ocupada;
	private Boolean activo;
	private EmpleadoDTO empleado;
	private List<PedidoDTO> pedidos;
	private Double cuenta;
}
