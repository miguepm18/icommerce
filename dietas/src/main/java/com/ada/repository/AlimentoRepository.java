package com.ada.repository;

import com.ada.entity.Alimento;
import com.ada.entity.Ingrediente;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface AlimentoRepository extends JpaRepository<Alimento,Integer>{
    
    @Transactional
    @Modifying
    @Query("delete from Alimento a where a.idAlimento=?1" )
    public void borrarAlimento(int id);
    
    
}

