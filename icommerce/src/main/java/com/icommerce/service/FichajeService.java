package com.icommerce.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.icommerce.modelo.Fichaje;
import com.icommerce.repository.FichajeRepository;

@Service
public class FichajeService {

	private final FichajeRepository fichajeRepository;


    public FichajeService(FichajeRepository fichajeRepository) {
        this.fichajeRepository = fichajeRepository;
    }
    
    public List<Fichaje> obtenerTodosLosFichajes(){
        
        List<Fichaje> fichajes=this.fichajeRepository.findAll();            
        return fichajes;
    }
    
    public Fichaje insertarModificarFichaje(Fichaje fichaje){
        return this.fichajeRepository.save(fichaje);
    }
    
    public Fichaje obtenerFichajeById(Long id) {
    	return this.fichajeRepository.findById(id).orElse(null);
    }
}
