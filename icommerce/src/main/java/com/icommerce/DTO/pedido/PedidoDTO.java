package com.icommerce.DTO.pedido;

import java.util.Date;
import java.util.List;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.icommerce.DTO.mesa.MesaDTO;
import com.icommerce.DTO.pedidoProducto.PedidoProductoDTO;

import lombok.Data;

@Data
public class PedidoDTO {

	private Long id;
	private String tipo;
	@JsonFormat(pattern="dd-MM-yy HH:mm:ss")
	private Date horaEntrada;
	@JsonFormat(pattern="dd-MM-yy HH:mm:ss")
	private Date horaSalida;
	private String estado;
	private Boolean activo;
	private Long mesaID;
	private List<PedidoProductoDTO> productos;
	private Long clienteID;
	private Long empleadoID;
}
