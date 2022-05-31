package com.icommerce.DTO.cliente;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ClienteNormalDTO {
	public String nombre;
	public String apellidos;
	public String usuario;
    public String password;
    public String direccion;
    public String email;
    public String dni;
    public Boolean activo;
    public String cuentabanco;
    public String fechacaducidadcuenta;
}
