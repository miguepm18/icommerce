package com.ada.services;


import com.ada.entity.Ingrediente;
import com.ada.entity.Receta;
import java.util.List;
import org.springframework.stereotype.Service;
import com.ada.repository.IngredienteRepository;
import com.ada.repository.RecetaRepository;

@Service
public class RecetaService {
    
    private final RecetaRepository recetaRepository;

    public RecetaService(RecetaRepository recetaRepository) {
        this.recetaRepository = recetaRepository;
    }
    
    public List<Receta> listarRecetas(){
        
        List<Receta> recetas=recetaRepository.findAll();          
                                       
        return recetas;   
    }
    
    public void guardarReceta(Receta receta){
        recetaRepository.save(receta);
    }
    
}
