package com.icommerce.DTO.cliente;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ClienteSinRelacionDTO {

	public Long id;
	public String nombre;
	public String apellidos;
	public String usuario;
    public String password;
    public String direccion;
    public String email;
    public Boolean activo;
    public String dni;
    public String cuentabanco;
    public String fechacaducidadcuenta;
}
