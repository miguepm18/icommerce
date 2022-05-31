/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.icommerce.modelo;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import javax.persistence.Table;


import lombok.Data;


@Data
@Entity
@Table(name = "pedido_producto")
public class PedidoProducto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "producto_id")
    private Producto producto;

    @Column(name="cantidad")
    private Integer cantidad;

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof PedidoProducto))
            return false;
        PedidoProducto that = (PedidoProducto) o;
        return Objects.equals(pedido.getId(), that.pedido.getId())
                && Objects.equals(producto.getNombre(), that.producto.getNombre())
                && Objects.equals(cantidad, that.cantidad);
    }

    @Override
    public int hashCode() {
        return Objects.hash(pedido.getId(), producto.getNombre(), cantidad);
    }
}