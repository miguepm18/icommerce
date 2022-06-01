package com.icommerce.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.icommerce.modelo.Mesa;
import com.icommerce.repository.MesaRepository;

@Service
public class MesaService {

	private final MesaRepository mesaRepository;


    public MesaService(MesaRepository mesaRepository) {
        this.mesaRepository = mesaRepository;
    }
    
    public List<Mesa> obtenerTodosLasMesas(){
        
        List<Mesa> mesas=this.mesaRepository.findAll();            
        return mesas;
    }
    
    public Mesa insertarModificarMesa(Mesa mesa){
        return this.mesaRepository.save(mesa);
    }
    
    public Mesa obtenerMesaById(Long id) {
    	return this.mesaRepository.findById(id).orElse(null);
    }
}
