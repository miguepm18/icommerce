package com.icommerce.controllers;


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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.icommerce.DTO.EmpleadoDTO;
import com.icommerce.DTO.EmpleadoDTOConverter;
import com.icommerce.modelo.Empleado;
import com.icommerce.repository.EmpleadoRepository;
import com.icommerce.service.EmpleadoService;

import lombok.RequiredArgsConstructor;
@CrossOrigin(origins = "*")
@RestController
public class EmpleadoController {

	private final EmpleadoRepository empleadoRepository;
	private final EmpleadoDTOConverter empleadoDTOConverter;
	private final EmpleadoService empleadoService;
	
	public EmpleadoController(EmpleadoRepository empleadoRepository, EmpleadoDTOConverter empleadoDTOConverter, EmpleadoService empleadoService) {
		this.empleadoDTOConverter=empleadoDTOConverter;
		this.empleadoRepository=empleadoRepository;
		this.empleadoService = empleadoService;
		
	}
	
	
	@GetMapping("/empleados")
	public ResponseEntity<?> obtenerEmpleados() {
		List<Empleado> result = this.empleadoService.obtenerTodosLosEmpleados();
		if(result.isEmpty()) {
			return ResponseEntity.notFound().build();
		}else {
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
	
	@CrossOrigin(origins = "http://localhost:8100")
	@PostMapping("/empleados/registrarEmpleado")
	public ResponseEntity<?> nuevoEmpleado(@RequestBody Empleado nuevoEmpleado){
		Empleado saved = empleadoRepository.save(nuevoEmpleado);
		return ResponseEntity.status(HttpStatus.CREATED).body(saved);
	}
	
	@GetMapping("/empleados/logIn/{username}/{password}")
	public ResponseEntity<?> logIn(@PathVariable String username, @PathVariable String password){
		boolean enc=false;
		Empleado empleadoEnc=null;
		List<Empleado> empleados = empleadoService.obtenerTodosLosEmpleados();
		for (Empleado empleado : empleados) {
			if(empleado.getUsuario().equalsIgnoreCase(username) && empleado.getPassword().equalsIgnoreCase(password)) {
				enc=true;
				empleadoEnc=empleado;
				return ResponseEntity.ok(empleadoDTOConverter.convertirADto(empleadoEnc));
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
