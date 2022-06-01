package com.icommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.icommerce.modelo.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long>{

}
