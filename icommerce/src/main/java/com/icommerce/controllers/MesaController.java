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
import com.icommerce.DTO.mesa.MesaDTO;
import com.icommerce.DTO.mesa.MesaDTOConverter;
import com.icommerce.modelo.Mesa;
import com.icommerce.service.MesaService;

@CrossOrigin
@RestController
public class MesaController {
	private final MesaDTOConverter mesaDTOConverter;
	private final MesaService mesaService;
	
	public MesaController(MesaDTOConverter mesaDTOConverter, MesaService mesaService) {
		this.mesaDTOConverter=mesaDTOConverter;
		this.mesaService = mesaService;
	}
	
	
	@GetMapping("/mesas")
	public ResponseEntity<?> obtenerMesas() {
		List<Mesa> result = this.mesaService.obtenerTodosLasMesas();
		if(result.isEmpty()) {
			return ResponseEntity.notFound().build();
		}else{
			List<MesaDTO> dtoList = result.stream().map(mesaDTOConverter::convertirAMesaDTO).collect(Collectors.toList());
			return ResponseEntity.ok(dtoList);
		}
	}
	
	
	@GetMapping("/mesas/{id}")
	public ResponseEntity<?> obtenerMesaID(@PathVariable Long id){
		Mesa result = this.mesaService.obtenerMesaById(id);
		if(result==null) {
			return ResponseEntity.notFound().build();
		}else {
			return ResponseEntity.ok(this.mesaDTOConverter.convertirAMesaDTO(result));
		}		
	}
	
	
	@PostMapping("/mesas/crearMesa")
	public ResponseEntity<?> nuevoMesa(@RequestBody MesaDTO nuevaMesa){
		Mesa mesa = this.mesaService.insertarModificarMesa(this.mesaDTOConverter.convertirAMesa(nuevaMesa));
		return ResponseEntity.status(HttpStatus.CREATED).body(this.mesaDTOConverter.convertirAMesaDTO(mesa));
	}
	
	
	
	
	@PutMapping("/mesas/modificarMesa")
	public ResponseEntity<?> editarMesa(@RequestBody MesaDTO mesaModificar){
		Mesa mesa = this.mesaDTOConverter.convertirAMesa(mesaModificar);
		if(this.mesaService.obtenerMesaById(mesa.getId())!=null) {
			Mesa MesaCreada = this.mesaService.insertarModificarMesa(mesa);
			return ResponseEntity.ok(this.mesaDTOConverter.convertirAMesaDTO(MesaCreada));
		}else {
			return ResponseEntity.ok(false);
		}
	}
}
