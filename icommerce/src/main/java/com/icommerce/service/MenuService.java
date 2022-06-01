package com.icommerce.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.icommerce.modelo.Menu;
import com.icommerce.repository.MenuRepository;

@Service
public class MenuService {

	private final MenuRepository menuRepository;


    public MenuService(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }
    
    public List<Menu> obtenerTodosLosMenus(){
        
        List<Menu> menus=this.menuRepository.findAll();            
        return menus;
    }
    
    public Menu insertarModificarMenu(Menu menu){
        return this.menuRepository.save(menu);
    }
    
    public Menu obtenerMenuById(Long id) {
    	return this.menuRepository.findById(id).orElse(null);
    }
}
