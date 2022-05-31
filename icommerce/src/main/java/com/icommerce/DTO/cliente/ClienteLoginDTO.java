package com.icommerce.DTO.cliente;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ClienteLoginDTO {

	public String usuario;
    public String password;
    public Boolean activo;

}
