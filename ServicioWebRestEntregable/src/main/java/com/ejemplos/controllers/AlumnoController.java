package com.ejemplos.controllers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ejemplos.DTO.AlumnoDTO;
import com.ejemplos.DTO.AlumnoDTOConverter;
import com.ejemplos.exepciones.AlumnoNotFoundException;
import com.ejemplos.exepciones.ApiError;
import com.ejemplos.modelo.Alumno;
import com.ejemplos.modelo.AlumnoRepositorio;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AlumnoController {

	private final AlumnoRepositorio alumnoRepositorio;
	private final AlumnoDTOConverter alumnoDTOConverter;
	
	@GetMapping("/alumno")
	public ResponseEntity<?> obtenerAlumnos() {
		List<Alumno> result = alumnoRepositorio.findAll();
		if(result.isEmpty()) {
			return ResponseEntity.notFound().build();
		}else {
			List<AlumnoDTO> dtoList = result.stream().map(alumnoDTOConverter::convertirADto).collect(Collectors.toList());
			
			return ResponseEntity.ok(dtoList);
		}
	}
	
	@GetMapping("/alumno/{id}")
	public ResponseEntity<?> obtenerAlumnoID(@PathVariable int id) throws AlumnoNotFoundException{
		Alumno result = alumnoRepositorio.findById(id).orElse(null);
		if(result==null) {
			throw new AlumnoNotFoundException("El alumno con ID: " + id + " no existe.");
		}else {
			return ResponseEntity.ok(alumnoDTOConverter.convertirADto(result));
		}
	}
	
	@PostMapping("/alumno")
	public ResponseEntity<?> nuevoAlumno(@RequestBody Alumno nuevo){
		Alumno saved = alumnoRepositorio.save(nuevo);
		return ResponseEntity.status(HttpStatus.CREATED).body(saved);
	}
	
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
	}
}
