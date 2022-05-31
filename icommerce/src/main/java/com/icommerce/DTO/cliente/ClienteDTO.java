package com.icommerce.DTO.cliente;



import java.util.Date;
import java.util.List;
import java.util.Set;

import com.icommerce.modelo.Pedido;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ClienteDTO {

	public Long id;
	public String nombre;
	public String apellidos;
	public String usuario;
    public String password;
    public String direccion;
    public String email;
    public String dni;
    public String cuentabanco;
    public String fechacaducidadcuenta;
    public Boolean activo;
    public Set<Pedido> pedidos;
}