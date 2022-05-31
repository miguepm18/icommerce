package com.icommerce.service;


import com.icommerce.DTO.cliente.*;
import com.icommerce.modelo.Cliente;
import com.icommerce.repository.ClienteRepository;
import java.util.List;
import org.springframework.stereotype.Service;


@Service
public class ClienteService {
    
    private final ClienteRepository clienteRepository;
    private final ClienteDTOConverter clienteDTOConverter;

    public ClienteService(ClienteRepository clienteRepository, ClienteDTOConverter clienteDTOConverter) {
        this.clienteRepository = clienteRepository;
        this.clienteDTOConverter = clienteDTOConverter;
    }
    
    public List<Cliente> obtenerTodosLosClientes(){
        
        List<Cliente> clientes=clienteRepository.findAll();          
                                       
        return clientes;   
    }
    
    public Cliente insertarCliente(Cliente cliente){
        return clienteRepository.save(cliente);
    }
    
    public Cliente obtenerClienteById(Long id) {
    	return clienteRepository.findById(id).orElse(null);
    }
    
    public ClienteRegistroDTO registrarCliente(ClienteRegistroDTO clienteRegistroDTO) {
    	Cliente clienteAnadido = this.clienteRepository.save(this.clienteDTOConverter.convertirACliente(clienteRegistroDTO));
    	return this.clienteDTOConverter.convertirAClienteRegistroDTO(clienteAnadido);
    }
    
    public ClienteDTO editarCliente(Cliente cliente) {
    	Cliente clienteSaved = this.clienteRepository.save(cliente);
    	return this.clienteDTOConverter.convertirAClienteDTO(clienteSaved);
    }

    
}
