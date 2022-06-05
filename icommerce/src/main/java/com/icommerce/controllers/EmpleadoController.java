package com.icommerce.controllers;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.icommerce.Encriptador;
import com.icommerce.DTO.empleado.EmpleadoDTO;
import com.icommerce.DTO.empleado.EmpleadoDTOConverter;
import com.icommerce.modelo.Empleado;
import com.icommerce.service.EmpleadoService;

@CrossOrigin
@RestController
public class EmpleadoController {

	private final EmpleadoDTOConverter empleadoDTOConverter;
	private final EmpleadoService empleadoService;
	private final Encriptador encripter;
	
	public EmpleadoController(EmpleadoDTOConverter empleadoDTOConverter, EmpleadoService empleadoService, Encriptador encripter) {
		this.empleadoDTOConverter=empleadoDTOConverter;
		this.empleadoService = empleadoService;
		this.encripter = encripter;
	}
	
	
	@GetMapping("/empleados")
	public ResponseEntity<?> obtenerEmpleados() {
		List<Empleado> result = this.empleadoService.obtenerTodosLosEmpleados();
		if(result.isEmpty()) {
			return ResponseEntity.notFound().build();
		}else{
			List<EmpleadoDTO> dtoList = result.stream().map(empleadoDTOConverter::convertirADto).collect(Collectors.toList());
			return ResponseEntity.ok(dtoList);
		}
	}
	
	@GetMapping("/empleados/checkUsername/{usuario}")
	public ResponseEntity<?> compruebaUsuarioEmpleado(@PathVariable String usuario) {
		boolean enc=false;
		List<Empleado> result = this.empleadoService.obtenerTodosLosEmpleados();
		for (Empleado empleado : result) {
			if(empleado.getUsuario().equalsIgnoreCase(usuario)) {
				enc=true;
			}
		}
		return ResponseEntity.ok(enc);
	}
	
	
	@GetMapping("/empleados/{id}")
	public ResponseEntity<?> obtenerEmpleadoID(@PathVariable Long id){
		Empleado result = this.empleadoService.obtenerEmpleadoById(id);
		if(result==null) {
			return ResponseEntity.notFound().build();
		}else {
			return ResponseEntity.ok(this.empleadoDTOConverter.convertirADto(result));
		}		
	}
	

	@PostMapping("/empleados/registrarEmpleado")
	public ResponseEntity<?> nuevoEmpleado(@RequestBody EmpleadoDTO nuevoEmpleado){
		nuevoEmpleado.setPassword(this.encripter.encoder().encode(nuevoEmpleado.getPassword()));	
		Empleado emp = this.empleadoService.insertarEditarEmpleado(this.empleadoDTOConverter.convertirAEmpleado(nuevoEmpleado));
		return ResponseEntity.status(HttpStatus.CREATED).body(this.empleadoDTOConverter.convertirADto(emp));
	}
	
	@PostMapping("/empleados/logIn")
	public ResponseEntity<?> logIn(@RequestBody EmpleadoDTO empleadoLogin){
		@SuppressWarnings("unused")
		Empleado empleadoEnc=null;
		List<Empleado> empleados = empleadoService.obtenerTodosLosEmpleados();
		for (Empleado empleado : empleados) {
			if(empleado.getUsuario().equals(empleadoLogin.getUsuario()) && this.encripter.encoder().matches(empleadoLogin.getPassword(), empleado.getPassword()) && empleado.getActivo()) {
				empleadoEnc=empleado;
				return ResponseEntity.ok(empleadoDTOConverter.convertirADto(empleadoEnc));
			}
		}
		
		return ResponseEntity.ok(false);
	}
	
	@PutMapping("/empleados/modificarEmpleado")
	public ResponseEntity<?> editarEmpleado(@RequestBody EmpleadoDTO empleadoEditar){
		Empleado empleado = this.empleadoDTOConverter.convertirAEmpleado(empleadoEditar);
		Empleado empBD = this.empleadoService.obtenerEmpleadoById(empleado.getId());
		if(empBD != null) {
			empleado.setPassword(empBD.getPassword());
		}
		if(empBD!=null) {
			Empleado empleadoModificado = this.empleadoService.insertarEditarEmpleado(empleado);
			return ResponseEntity.ok(this.empleadoDTOConverter.convertirADto(empleadoModificado));
		}else {
			return ResponseEntity.ok(false);
		}
	}
	
	@DeleteMapping("/empleados/borrarEmpleado/{id}")
	public ResponseEntity<?> borrarEmpleado(@PathVariable Long id){
		Empleado emp = this.empleadoService.obtenerEmpleadoById(id);
		emp.setActivo(false);
		this.empleadoService.insertarEditarEmpleado(emp);
		return ResponseEntity.ok(this.empleadoDTOConverter.convertirADto(emp));
	}
		
}
