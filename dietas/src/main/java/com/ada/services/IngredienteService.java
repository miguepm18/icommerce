package com.ada.services;


import com.ada.entity.Ingrediente;
import java.util.List;
import org.springframework.stereotype.Service;
import com.ada.repository.IngredienteRepository;

@Service
public class IngredienteService {
    
    private final IngredienteRepository ingredienteRepository;

    public IngredienteService(IngredienteRepository ingredienteRepository) {
        this.ingredienteRepository = ingredienteRepository;
    }
    
    public List<Ingrediente> listarIngredientes(){
        
        List<Ingrediente> ingredientes=ingredienteRepository.findAll();          
                                       
        return ingredientes;   
    }
    
    public void guardarIngrediente(Ingrediente ingrediente){
        ingredienteRepository.save(ingrediente);
    }
    
}
