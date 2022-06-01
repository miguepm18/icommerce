package com.icommerce.controllers;

import com.icommerce.DTO.cliente.ClienteDTO;
import com.icommerce.DTO.cliente.ClienteDTOConverter;
import com.icommerce.modelo.Cliente;
import com.icommerce.service.ClienteService;


import java.util.List;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class ClienteController {

	private final ClienteDTOConverter clienteDTOConverter;
	private final ClienteService clienteService;
	
	public ClienteController(ClienteDTOConverter clienteDTOConverter, ClienteService clienteService) {
		this.clienteDTOConverter=clienteDTOConverter;
		this.clienteService = clienteService;
	}
	
	//Devuelve todos los clientes
	@GetMapping("/clientes")
	public ResponseEntity<?> obtenerClientes() {
		List<Cliente> result = this.clienteService.obtenerTodosLosClientes();
		
		if(result.isEmpty()) {
			return ResponseEntity.notFound().build();
		}else {
			List<ClienteDTO> dtoList = new ArrayList<ClienteDTO>();
			for (Cliente cliente : result) {
				dtoList.add(this.clienteDTOConverter.convertirAClienteDTO(cliente));
			}
			return ResponseEntity.ok(dtoList);
		}
	}
	
	//Devuelve si existe un usuario
	@GetMapping("/clientes/checkUsername/{usuario}")
	public ResponseEntity<?> compruebaUsuarioClientes(@PathVariable String usuario) {
		boolean enc=false;
		List<Cliente> result = this.clienteService.obtenerTodosLosClientes();
		for (Cliente cliente : result) {
			if(cliente.getUsuario().equalsIgnoreCase(usuario)) {
				enc=true;
			}
		}
		return ResponseEntity.ok(enc);
	}
	
	//Devuelve un cliente a partir de un id
	@GetMapping("/clientes/{id}")
	public ResponseEntity<?> obtenerClienteID(@PathVariable Long id){
		Cliente result = this.clienteService.obtenerClienteById(id);
		if(result==null) {
			return ResponseEntity.notFound().build();
		}else {
			return ResponseEntity.ok(this.clienteDTOConverter.convertirAClienteDTO(result));
		}		
	}
	
	//Añade un cliente nuevo al registrarse
	@PostMapping("/clientes/registrarCliente")
	public ResponseEntity<?> nuevoCliente(@RequestBody ClienteDTO nuevoCliente){
		this.clienteService.insertarEditarCliente(this.clienteDTOConverter.convertirACliente(nuevoCliente));
		return ResponseEntity.status(HttpStatus.CREATED).body(null);
	}
	
	//Devuelve un cliente completo si existe el nombre y usuario pasados
	//Si no existe devuelve false
	@GetMapping("/clientes/logIn")
	public ResponseEntity<?> logIn(@RequestBody ClienteDTO clienteLogin){
		@SuppressWarnings("unused")
		boolean enc=false;
		Cliente clienteEnc=null;
		List<Cliente> clientes = clienteService.obtenerTodosLosClientes();
		for (Cliente cliente : clientes) {
			if(cliente.getUsuario().equalsIgnoreCase(clienteLogin.getUsuario()) && cliente.getPassword().equalsIgnoreCase(clienteLogin.getPassword()) && cliente.getActivo() ) {
				enc=true;
				clienteEnc=cliente;
				return ResponseEntity.ok(clienteDTOConverter.convertirAClienteDTO(clienteEnc));
			}
		}
		
		return ResponseEntity.ok(false);
	}
	
	//Actualiza los campos de un cliente
	@PutMapping("/clientes/modificarCliente")
	public ResponseEntity<?> editarCliente(@RequestBody ClienteDTO clienteEditar){
		Cliente cliente = this.clienteDTOConverter.convertirACliente(clienteEditar);
		if(this.clienteService.obtenerClienteById(cliente.getId())!=null) {
			Cliente clienteModificado = this.clienteService.insertarEditarCliente(cliente);
			return ResponseEntity.ok(this.clienteDTOConverter.convertirAClienteDTO(clienteModificado));
		}else {
			return ResponseEntity.ok(false);
		}
	}
		
	

}
