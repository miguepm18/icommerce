package com.icommerce.DTO.empleado;



import java.util.List;

import com.icommerce.modelo.Fichaje;
import com.icommerce.modelo.Mesa;
import com.icommerce.modelo.Pedido;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class EmpleadoDTO {

	public Integer idEmpleado;
	public String nombre;
	public String apellidos;
	public String usuario;
    public String password;
    public String direccion;
    public String email;
    public int movil;
    public String dni;
    public short esadministrador;
    public short esrepartidor;
    public List<Mesa> mesaList;
    public List<Fichaje> fichajeList;
    public List<Pedido> pedidoList;
}