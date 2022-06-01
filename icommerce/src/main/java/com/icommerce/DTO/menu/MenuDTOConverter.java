package com.icommerce.DTO.menu;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import com.icommerce.modelo.Menu;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MenuDTOConverter {

	private final ModelMapper modelMapper = new ModelMapper();
	
	public Menu convertirAMenu(MenuDTO menuDto) {
		return modelMapper.map(menuDto, Menu.class);
	}
	
	public MenuDTO convertirAMenuDTO(Menu menu) {
		return modelMapper.map(menu, MenuDTO.class);
	}
        
}
