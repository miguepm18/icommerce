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

import com.icommerce.DTO.empleado.EmpleadoDTO;
import com.icommerce.DTO.empleado.EmpleadoDTOConverter;
import com.icommerce.DTO.fichaje.FichajeDTO;
import com.icommerce.DTO.fichaje.FichajeDTOConverter;
import com.icommerce.modelo.Fichaje;
import com.icommerce.modelo.Mesa;
import com.icommerce.service.FichajeService;

@CrossOrigin
@RestController
public class FichajeController {

	private final FichajeDTOConverter fichajeDTOConverter;
	private final EmpleadoDTOConverter empleadoDTOConverter;
	private final FichajeService fichajeService;
	
	public FichajeController(FichajeDTOConverter fichajeDTOConverter, FichajeService fichajeService, EmpleadoDTOConverter empleadoDTOConverter) {
		this.fichajeDTOConverter=fichajeDTOConverter;
		this.fichajeService = fichajeService;
		this.empleadoDTOConverter=empleadoDTOConverter;
	}
	
	
	@GetMapping("/fichajes")
	public ResponseEntity<?> obtenerFichajes() {
		List<Fichaje> result = this.fichajeService.obtenerTodosLosFichajes();
		if(result.isEmpty()) {
			return ResponseEntity.notFound().build();
		}else{
			List<FichajeDTO> dtoList = result.stream().map(fichajeDTOConverter::convertirAFichajeDTO).collect(Collectors.toList());
			return ResponseEntity.ok(dtoList);
		}
	}
	
	
	@GetMapping("/fichajes/{id}")
	public ResponseEntity<?> obtenerFichajeID(@PathVariable Long id){
		Fichaje result = this.fichajeService.obtenerFichajeById(id);
		if(result==null) {
			return ResponseEntity.notFound().build();
		}else {
			return ResponseEntity.ok(this.fichajeDTOConverter.convertirAFichajeDTO(result));
		}		
	}
	

	@PostMapping("/fichajes/crearFichaje")
	public ResponseEntity<?> nuevoFichaje(@RequestBody FichajeDTO nuevoFichaje){
		Fichaje fichaje = this.fichajeService.insertarModificarFichaje(this.fichajeDTOConverter.convertirAFichaje(nuevoFichaje));
		return ResponseEntity.status(HttpStatus.CREATED).body(this.fichajeDTOConverter.convertirAFichajeDTO(fichaje));
	}
	
	
	
	
	@PutMapping("/fichajes/modificarFichaje")
	public ResponseEntity<?> editarFichaje(@RequestBody FichajeDTO fichajeModificar){
		Fichaje fichaje = this.fichajeDTOConverter.convertirAFichaje(fichajeModificar);
		if(this.fichajeService.obtenerFichajeById(fichaje.getId())!=null) {
			Fichaje fichajeModificado = this.fichajeService.insertarModificarFichaje(fichaje);
			return ResponseEntity.ok(this.fichajeDTOConverter.convertirAFichajeDTO(fichajeModificado));
		}else {
			return ResponseEntity.ok(false);
		}
	}
	
	@DeleteMapping("/fichajes/borrarFichaje/{id}")
	public ResponseEntity<?> borrarFichaje(@PathVariable Long id){
		Fichaje fichaje = this.fichajeService.obtenerFichajeById(id);
		fichaje.setActivo(false);
		this.fichajeService.insertarModificarFichaje(fichaje);
		return ResponseEntity.ok(this.fichajeDTOConverter.convertirAFichajeDTO(fichaje));
	}
	
	@GetMapping("/fichajes/empleado/{id}")
	public ResponseEntity<?> obtenerFichajesDeEmpleado(@PathVariable Long id){
		List<Fichaje> result = this.fichajeService.fichajesEmpleado(id);
		if(result==null) {
			return ResponseEntity.notFound().build();
		}else {
			List<FichajeDTO> dtoList = result.stream().map(fichajeDTOConverter::convertirAFichajeDTO).collect(Collectors.toList());
			return ResponseEntity.ok(dtoList);
		}		
	}
	
}
