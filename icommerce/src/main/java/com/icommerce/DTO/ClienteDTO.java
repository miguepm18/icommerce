package com.icommerce.DTO;



import java.util.Date;
import java.util.List;

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
    public Date fechanacimiento;
    public String cuentabanco;
    public String fechacaducidadcuenta;
    public List<Pedido> pedidoList;
}