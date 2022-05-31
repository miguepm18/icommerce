package com.icommerce.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.icommerce.modelo.Empleado;

@RepositoryRestResource
public interface EmpleadoRepository extends JpaRepository<Empleado,Long>{
    
    
    
    
    
}

