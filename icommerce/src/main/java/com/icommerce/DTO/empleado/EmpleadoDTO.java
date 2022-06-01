package com.icommerce.DTO.empleado;



import java.util.List;

import com.icommerce.DTO.fichaje.FichajeDTO;
import com.icommerce.DTO.mesa.MesaDTO;
import com.icommerce.DTO.pedido.PedidoDTO;
import lombok.Data;

@Data
public class EmpleadoDTO {

	private Long id;
	private String nombre;
	private String apellidos;
	private String usuario;
    private String password;
    private String direccion;
    private String email;
    private int movil;
    private String dni;
    private Boolean esAdministrador;
    private Boolean esRepartidor;
    private Boolean activo;
    private List<MesaDTO> mesas;
    private List<FichajeDTO> fichajes;
    private List<PedidoDTO> pedidos;
}