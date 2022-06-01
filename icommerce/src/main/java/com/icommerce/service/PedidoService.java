package com.icommerce.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.icommerce.modelo.Pedido;
import com.icommerce.repository.PedidoRepository;

@Service
public class PedidoService {

	private final PedidoRepository pedidoRepository;


    public PedidoService(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }
    
    public List<Pedido> obtenerTodosLosPedidos(){
        
        List<Pedido> pedidos=this.pedidoRepository.findAll();            
        return pedidos;
    }
    
    public Pedido insertarModificarPedido(Pedido pedido){
        return this.pedidoRepository.save(pedido);
    }
    
    public Pedido obtenerPedidoById(Long id) {
    	return this.pedidoRepository.findById(id).orElse(null);
    }
    
}
