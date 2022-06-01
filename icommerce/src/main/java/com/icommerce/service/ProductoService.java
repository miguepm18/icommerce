package com.icommerce.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.icommerce.modelo.Producto;
import com.icommerce.repository.ProductoRepository;

@Service
public class ProductoService {

	private final ProductoRepository productoRepository;


    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }
    
    public List<Producto> obtenerTodosLosProductos(){
        
        List<Producto> productos=this.productoRepository.findAll();            
        return productos;
    }
    
    public Producto insertarModificarProducto(Producto producto){
    	producto.setId(null);
        return this.productoRepository.save(producto);
    }
    
    public Producto obtenerProductoById(Long id) {
    	return this.productoRepository.findById(id).orElse(null);
    }
    
}
