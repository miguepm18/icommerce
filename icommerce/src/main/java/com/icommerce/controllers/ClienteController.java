package com.icommerce.controllers;

import com.icommerce.DTO.ClienteDTO;
import com.icommerce.DTO.ClienteDTOConverter;
import com.icommerce.modelo.Cliente;
import com.icommerce.modelo.Pedido;
import com.icommerce.repository.ClienteRepository;
import com.icommerce.service.ClienteService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
@CrossOrigin(origins = "")
@RestController
public class ClienteController {

	private final ClienteDTOConverter clienteDTOConverter;
	private final ClienteService clienteService;
	
	public ClienteController(ClienteDTOConverter clienteDTOConverter, ClienteService clienteService) {
		this.clienteDTOConverter=clienteDTOConverter;
		this.clienteService = clienteService;
	}
	
	@GetMapping("/clientes")
	public ResponseEntity<?> obtenerClientes() {
		System.out.println("Entra");
		List<Cliente> result = this.clienteService.obtenerTodosLosClientes();
		
		if(result.isEmpty()) {
			return ResponseEntity.notFound().build();
		}else {
			List<ClienteDTO> dtoList = result.stream().map(clienteDTOConverter::convertirADto).collect(Collectors.toList());
			
			return ResponseEntity.ok(dtoList);
		}
	}
	
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
	
	
	@GetMapping("/clientes/{id}")
	public ResponseEntity<?> obtenerClienteID(@PathVariable Long id){
		Cliente result = this.clienteService.obtenerClienteById(id);
		if(result==null) {
			return ResponseEntity.notFound().build();
		}else {
			return ResponseEntity.ok(this.clienteDTOConverter.convertirADto(result));
		}		
	}
	/*
	@CrossOrigin(origins = "http://localhost:8100")
	@PostMapping("/clientes/registrarCliente")
	public ResponseEntity<?> nuevoCliente(@RequestBody Cliente nuevoCliente){
		Cliente saved = clienteRepository.save(nuevoCliente);
		return ResponseEntity.status(HttpStatus.CREATED).body(saved);
	}*/
	
	@GetMapping("/clientes/logIn/{username}/{password}")
	public ResponseEntity<?> logIn(@PathVariable String username, @PathVariable String password){
		boolean enc=false;
		Cliente clienteEnc=null;
		List<Cliente> clientes = clienteService.obtenerTodosLosClientes();
		for (Cliente cliente : clientes) {
			if(cliente.getUsuario().equalsIgnoreCase(username) && cliente.getPassword().equalsIgnoreCase(password)) {
				enc=true;
				clienteEnc=cliente;
				return ResponseEntity.ok(clienteDTOConverter.convertirADto(clienteEnc));
			}
		}
		
		return ResponseEntity.ok(false);
	}
	/*
	@PutMapping("/alumno/{id}")
	public ResponseEntity<?> editarAlumno(@RequestBody Alumno editar, @PathVariable int id) throws AlumnoNotFoundException{
		if(alumnoRepositorio.existsById(id)) {
			editar.setId_alumno(id);
			return ResponseEntity.ok(alumnoRepositorio.save(editar));
		}else {
			throw new AlumnoNotFoundException("El alumno con ID: " + id + " no existe.");
		}
	}
	
	
	@DeleteMapping("/alumno/{id}")
	public ResponseEntity<?> borrarAlumno(@PathVariable int id){
		if(alumnoRepositorio.existsById(id)) {
			alumnoRepositorio.deleteById(id);
			return ResponseEntity.noContent().build();
		}else {
			return ResponseEntity.notFound().build();
		}
	}

	@ExceptionHandler(AlumnoNotFoundException.class)
	public ResponseEntity<ApiError> handleAlumnoNoEncontrado(AlumnoNotFoundException ex){
		ApiError apiError = new ApiError();
		apiError.setEstado(HttpStatus.NOT_FOUND);
		apiError.setFecha(LocalDateTime.now());
		apiError.setMensaje(ex.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiError);
	}*/
}
