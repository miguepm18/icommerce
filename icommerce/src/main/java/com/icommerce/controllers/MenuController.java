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
import com.icommerce.DTO.menu.MenuDTO;
import com.icommerce.DTO.menu.MenuDTOConverter;
import com.icommerce.modelo.Cliente;
import com.icommerce.modelo.Menu;
import com.icommerce.service.MenuService;

@CrossOrigin
@RestController
public class MenuController {

	private final MenuDTOConverter menuDTOConverter;
	private final MenuService menuService;
	
	public MenuController(MenuDTOConverter menuDTOConverter, MenuService menuService) {
		this.menuDTOConverter=menuDTOConverter;
		this.menuService = menuService;
	}
	
	
	@GetMapping("/menus")
	public ResponseEntity<?> obtenerMenus() {
		List<Menu> result = this.menuService.obtenerTodosLosMenus();
		if(result.isEmpty()) {
			return ResponseEntity.notFound().build();
		}else{
			List<MenuDTO> dtoList = result.stream().map(menuDTOConverter::convertirAMenuDTO).collect(Collectors.toList());
			return ResponseEntity.ok(dtoList);
		}
	}
	
	
	@GetMapping("/menus/{id}")
	public ResponseEntity<?> obtenerMenuID(@PathVariable Long id){
		Menu result = this.menuService.obtenerMenuById(id);
		if(result==null) {
			return ResponseEntity.notFound().build();
		}else {
			return ResponseEntity.ok(this.menuDTOConverter.convertirAMenuDTO(result));
		}		
	}
	

	@PostMapping("/menus/crearMenu")
	public ResponseEntity<?> nuevoMenu(@RequestBody MenuDTO nuevoMenu){
		Menu menu = this.menuService.insertarModificarMenu(this.menuDTOConverter.convertirAMenu(nuevoMenu));
		return ResponseEntity.status(HttpStatus.CREATED).body(this.menuDTOConverter.convertirAMenuDTO(menu));
	}
	
	
	
	
	@PutMapping("/menus/modificarMenu")
	public ResponseEntity<?> editarMenu(@RequestBody MenuDTO menuModificar){
		Menu menu = this.menuDTOConverter.convertirAMenu(menuModificar);
		if(this.menuService.obtenerMenuById(menu.getId())!=null) {
			Menu menuCreado = this.menuService.insertarModificarMenu(menu);
			return ResponseEntity.ok(this.menuDTOConverter.convertirAMenuDTO(menuCreado));
		}else {
			return ResponseEntity.ok(false);
		}
	}
	
	@DeleteMapping("/menus/borrarMenu/{id}")
	public ResponseEntity<?> borrarMenu(@PathVariable Long id){
		Menu menu = this.menuService.obtenerMenuById(id);
		menu.setActivo(false);
		this.menuService.insertarModificarMenu(menu);
		return ResponseEntity.ok(this.menuDTOConverter.convertirAMenuDTO(menu));
	}
}
