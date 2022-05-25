package com.icommerce.DTO.cliente;



import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ClienteDTO {

	public Integer idCliente;
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
}