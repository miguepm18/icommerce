package com.icommerce.DTO.cliente;

import java.util.Set;

import com.icommerce.modelo.Pedido;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ClienteRegistroDTO {

	public String nombre;
	public String apellidos;
	public String usuario;
    public String password;
    public String direccion;
    public String email;
    public String dni;
    public Boolean activo;
}
