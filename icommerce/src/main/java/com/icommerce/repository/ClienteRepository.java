package com.icommerce.repository;

import com.icommerce.modelo.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource
public interface ClienteRepository extends JpaRepository<Cliente,Long>{
    
    
    
    
    
}

