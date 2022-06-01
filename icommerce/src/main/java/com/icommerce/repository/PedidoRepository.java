package com.icommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.icommerce.modelo.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long>{

}
