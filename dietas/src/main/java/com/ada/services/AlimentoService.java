package com.ada.services;


import com.ada.entity.Alimento;
import com.ada.repository.AlimentoRepository;
import java.util.List;
import org.springframework.stereotype.Service;


@Service
public class AlimentoService {
    
    private final AlimentoRepository alimentoRepository;

    public AlimentoService(AlimentoRepository alimentoRepository) {
        this.alimentoRepository = alimentoRepository;
    }
    
    public List<Alimento> listarAlimentos(){
        
        List<Alimento> alimentos=alimentoRepository.findAll();          
                                       
        return alimentos;   
    }
    
    public void guardarAlimento(Alimento alimento){
        alimentoRepository.save(alimento);
    }
    
    public Alimento listarAlimentoId(int idAlimento){
        Alimento alimento = alimentoRepository.getById(idAlimento);
        return alimento;
    }
    
    public void eliminarAlimento(Alimento alimento){
        alimentoRepository.borrarAlimento(alimento.getIdAlimento());
    }
    
}
