package com.icommerce.DTO.cliente;



import java.util.Date;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.icommerce.DTO.pedido.PedidoDTO;
import lombok.Data;

@Data
public class ClienteDTO {

	public Long id;
	public String nombre;
	public String apellidos;
	public String usuario;
    public String password;
    public String direccion;
    public String email;
    public String dni;
    public String cuentaBanco;
    @JsonFormat(pattern="MM-yy")
    public Date fechaCaducidadCuenta;
    public Boolean activo;
    List<PedidoDTO> pedidos;
}