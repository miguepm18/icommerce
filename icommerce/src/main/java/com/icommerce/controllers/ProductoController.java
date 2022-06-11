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
import com.icommerce.DTO.producto.ProductoDTO;
import com.icommerce.DTO.producto.ProductoDTOConverter;
import com.icommerce.modelo.Fichaje;
import com.icommerce.modelo.Producto;
import com.icommerce.service.ProductoService;

@CrossOrigin
@RestController
public class ProductoController {

	private final ProductoDTOConverter productoDTOConverter;
	private final ProductoService productoService;
	
	public ProductoController(ProductoDTOConverter productoDTOConverter, ProductoService productoService) {
		this.productoDTOConverter=productoDTOConverter;
		this.productoService = productoService;
	}
	
	
	@GetMapping("/productos")
	public ResponseEntity<?> obtenerProductos() {
		List<Producto> result = this.productoService.obtenerTodosLosProductos();
		if(result.isEmpty()) {
			return ResponseEntity.notFound().build();
		}else{
			List<ProductoDTO> dtoList = result.stream().map(productoDTOConverter::convertirAProductoDTO).collect(Collectors.toList());
			return ResponseEntity.ok(dtoList);
		}
	}
	
	
	@GetMapping("/productos/{id}")
	public ResponseEntity<?> obtenerProductoID(@PathVariable Long id){
		Producto result = this.productoService.obtenerProductoById(id);
		if(result==null) {
			return ResponseEntity.notFound().build();
		}else {
			return ResponseEntity.ok(this.productoDTOConverter.convertirAProductoDTO(result));
		}		
	}
	
	@GetMapping("/productos/numeroProductos")
	public ResponseEntity<?> obtenerTotalProductos(){
		List<Producto> productos = this.productoService.obtenerTodosLosProductos();
		if(productos==null) {
			return ResponseEntity.notFound().build();
		}else {
			return ResponseEntity.ok(productos.size());
		}		
	}
	

	@PostMapping("/productos/crearProducto")
	public ResponseEntity<?> nuevoProducto(@RequestBody ProductoDTO nuevoProducto){
		Producto producto = this.productoService.insertarModificarProducto(this.productoDTOConverter.convertirAProducto(nuevoProducto));
		return ResponseEntity.status(HttpStatus.CREATED).body(this.productoDTOConverter.convertirAProductoDTO(producto));
	}
	
	
	
	
	@PutMapping("/productos/modificarProducto")
	public ResponseEntity<?> editarProducto(@RequestBody ProductoDTO productoModificar){
		Producto producto = this.productoDTOConverter.convertirAProducto(productoModificar);
		if(this.productoService.obtenerProductoById(producto.getId())!=null) {
			Producto productoCreado = this.productoService.insertarModificarProducto(producto);
			return ResponseEntity.ok(this.productoDTOConverter.convertirAProductoDTO(productoCreado));
		}else {
			return ResponseEntity.ok(false);
		}
	}
	
	@DeleteMapping("/productos/borrarProducto/{id}")
	public ResponseEntity<?> borrarProducto(@PathVariable Long id){
		Producto producto = this.productoService.obtenerProductoById(id);
		producto.setActivo(false);
		this.productoService.insertarModificarProducto(producto);
		return ResponseEntity.ok(this.productoDTOConverter.convertirAProductoDTO(producto));
	}
}
