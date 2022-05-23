package com.icommerce.DTO.cliente;



import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ClienteDTO {

	private Integer idCliente;
	private String nombre;
	private String apellidos;
    private String usuario;
    private String password;
    private String direccion;
    private String email;
    private String dni;
    private Date fechaNacimiento;
    private String cuentaBanco;
    private String fechaCaducidadCuenta;
}