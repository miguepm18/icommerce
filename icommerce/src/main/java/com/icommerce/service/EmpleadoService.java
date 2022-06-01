package com.icommerce.service;



import com.icommerce.modelo.Empleado;
import com.icommerce.repository.EmpleadoRepository;

import java.util.List;
import org.springframework.stereotype.Service;


@Service
public class EmpleadoService {
    
    private final EmpleadoRepository empleadoRepository;

    public EmpleadoService(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }
    
    public List<Empleado> obtenerTodosLosEmpleados(){
        
        List<Empleado> empleados=empleadoRepository.findAll();            
        return empleados;
    }
    
    public Empleado insertarEditarEmpleado(Empleado empleado){
        return empleadoRepository.save(empleado);
    }
    
    public Empleado obtenerEmpleadoById(Long id) {
    	return empleadoRepository.findById(id).orElse(null);
    }
    
}
