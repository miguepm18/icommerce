package com.ada.controller;

import com.ada.entity.Alimento;
import com.ada.entity.Ingrediente;
import com.ada.entity.Receta;
import com.ada.repository.IngredienteRepository;
import com.ada.services.AlimentoService;
import com.ada.services.IngredienteService;
import com.ada.services.RecetaService;
import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class InicioController {
    
    private final IngredienteService ingredienteService;
    private final AlimentoService alimentoService;
    private final RecetaService recetaService;
    

    public InicioController(IngredienteService ingredienteService, AlimentoService alimentoService, RecetaService recetaService) {
        
        this.ingredienteService = ingredienteService;
        this.alimentoService = alimentoService;
        this.recetaService = recetaService;
            
    }
    
    
    @RequestMapping("/")
    public String irInicio(Model modelo){
        
        
        return"inicio";
    }
    
    
   
    
    @RequestMapping("/alimento")
    public String detalleAlimento(Model modelo){
     List<Alimento> alimentos = this.alimentoService.listarAlimentos();
     modelo.addAttribute("alimento", new Alimento());
     modelo.addAttribute("alimentos",alimentos);  
     return"listado_alimento";
    }
    
    
    @RequestMapping("/alimento/crear")
    public String crearAlimento(Model modelo){
     Alimento alimento = new Alimento();
     modelo.addAttribute("alimento", alimento);
     return"form_alimento";
    }
    
    @GetMapping("/alimento/eliminar/{id}")
    public String eliminarAlimento(@PathVariable int id){
     Alimento al = alimentoService.listarAlimentoId(id);
     alimentoService.eliminarAlimento(al);
     return"redirect:/alimento";
    }
    
    
    @PostMapping("/alimento/guardar")
    public String guardarAlimento(Alimento alimento){
        alimentoService.guardarAlimento(alimento);
        return"redirect:/alimento";
    }
    
    
    
}
