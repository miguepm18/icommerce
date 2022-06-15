import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Menu } from 'src/app/modelo/Menu';
import { MenuProducto } from 'src/app/modelo/MenuProducto';
import { Mesa } from 'src/app/modelo/Mesa';
import { PedidoProducto } from 'src/app/modelo/PedidoProducto';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';

@Component({
  selector: 'app-anadir-menu-mesa',
  templateUrl: './anadir-menu-mesa.page.html',
  styleUrls: ['./anadir-menu-mesa.page.scss'],
})
export class AnadirMenuMesaPage implements OnInit {

  public menus:Array<Menu>;
  @Input() mesa:Mesa;
  constructor(private modalController: ModalController, private apiService: ApiServiceProvider, private alertController: AlertController) { }

  ngOnInit() {
    this.menus = new Array<Menu>();
    this.apiService.getMenus()
        .then((respuesta: any) => {
          this.menus= new Array<Menu>();
          respuesta.forEach(menuJson => {
            let menu = Menu.createFromJsonObject(menuJson);
            if(menu.activo){
              this.menus.push(menu);
            }
        });
    });    
    
  }

  async cerrarModal() {
    this.mesa.cuenta=this.mesa.pedidos[this.mesa.pedidos.length-1].precio;
    await this.modalController.dismiss();    
  }

  anadirMenu(menu:Menu){ 
    menu.productos.forEach(menuProducto => {
      let enc:boolean = false;
      this.mesa.pedidos[this.mesa.pedidos.length-1].productos.forEach(pedidoProducto => {        
        if(menuProducto.producto.id==pedidoProducto.producto.id){
          enc=true;
          pedidoProducto.cantidad+=menuProducto.cantidad;
          this.mesa.pedidos[this.mesa.pedidos.length-1].precio+=menuProducto.producto.precio*menuProducto.cantidad;
        }
      });
      if(!enc){
        let pedidoProductoNuevo:PedidoProducto = new PedidoProducto(null, this.mesa.pedidos[this.mesa.pedidos.length-1].id, menuProducto.cantidad, menuProducto.producto);
        this.mesa.pedidos[this.mesa.pedidos.length-1].productos.push(pedidoProductoNuevo);
        this.mesa.pedidos[this.mesa.pedidos.length-1].precio+=pedidoProductoNuevo.producto.precio*pedidoProductoNuevo.cantidad;
      }
    });
  }
  
}
