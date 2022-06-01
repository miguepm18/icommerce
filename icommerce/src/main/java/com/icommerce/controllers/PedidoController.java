package com.icommerce.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.icommerce.DTO.pedido.PedidoDTO;
import com.icommerce.DTO.pedido.PedidoDTOConverter;
import com.icommerce.modelo.Pedido;
import com.icommerce.service.PedidoService;

@CrossOrigin
@RestController
public class PedidoController {
	private final PedidoDTOConverter pedidoDTOConverter;
	private final PedidoService pedidoService;
	
	public PedidoController(PedidoDTOConverter pedidoDTOConverter, PedidoService pedidoService) {
		this.pedidoDTOConverter=pedidoDTOConverter;
		this.pedidoService = pedidoService;
	}
	
	
	@GetMapping("/pedidos")
	public ResponseEntity<?> obtenerPedidos() {
		List<Pedido> result = this.pedidoService.obtenerTodosLosPedidos();
		if(result.isEmpty()) {
			return ResponseEntity.notFound().build();
		}else{
			List<PedidoDTO> dtoList = result.stream().map(pedidoDTOConverter::convertirADto).collect(Collectors.toList());
			return ResponseEntity.ok(dtoList);
		}
	}
	
	
	@GetMapping("/pedidos/{id}")
	public ResponseEntity<?> obtenerPedidoID(@PathVariable Long id){
		Pedido result = this.pedidoService.obtenerPedidoById(id);
		if(result==null) {
			return ResponseEntity.notFound().build();
		}else {
			return ResponseEntity.ok(this.pedidoDTOConverter.convertirADto(result));
		}		
	}
	
	
	@PostMapping("/pedidos/crearPedido")
	public ResponseEntity<?> nuevoPedido(@RequestBody PedidoDTO nuevoPedido){
		Pedido pedido = this.pedidoService.insertarModificarPedido(this.pedidoDTOConverter.convertirAPedido(nuevoPedido));
		return ResponseEntity.status(HttpStatus.CREATED).body(this.pedidoDTOConverter.convertirADto(pedido));
	}
	
	
	
	
	@PutMapping("/pedidos/modificarPedido")
	public ResponseEntity<?> editarPedido(@RequestBody PedidoDTO pedidoModificar){
		Pedido pedido = this.pedidoDTOConverter.convertirAPedido(pedidoModificar);
		if(this.pedidoService.obtenerPedidoById(pedido.getId())!=null) {
			Pedido pedidoCreado = this.pedidoService.insertarModificarPedido(pedido);
			return ResponseEntity.ok(this.pedidoDTOConverter.convertirADto(pedidoCreado));
		}else {
			return ResponseEntity.ok(false);
		}
	}
}
