package com.icommerce.service;


import com.icommerce.modelo.Cliente;
import com.icommerce.repository.ClienteRepository;
import java.util.List;
import org.springframework.stereotype.Service;


@Service
public class ClienteService {
    
    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    
    public List<Cliente> obtenerTodosLosClientes(){
        
        List<Cliente> clientes=clienteRepository.findAll();          
                                       
        return clientes;   
    }
    
    public void insertarCliente(Cliente cliente){
        clienteRepository.save(cliente);
    }
    
    public Cliente obtenerClienteById(int id) {
    	return clienteRepository.findById(id).orElse(null);
    }

    
}
