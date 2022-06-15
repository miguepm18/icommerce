import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { MenuProducto } from 'src/app/modelo/MenuProducto';
import { Producto } from 'src/app/modelo/Producto';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';

@Component({
  selector: 'app-anadir-producto-menu',
  templateUrl: './anadir-producto-menu.page.html',
  styleUrls: ['./anadir-producto-menu.page.scss'],
})
export class AnadirProductoMenuPage implements OnInit {

  @Input() productosActivos:Array<Producto>;
  @Input() productoMenu:Array<MenuProducto>;
  public productosDelMenu:Array<MenuProducto> = new Array<MenuProducto>();
  @Input() public idMenu:number;
  constructor(private modalController: ModalController, private apiService: ApiServiceProvider, private alertController: AlertController) {    
      
   }

  ngOnInit() {    
    this.productosDelMenu = this.productoMenu;
    console.log(this.productoMenu);
    
    console.log(this.productosDelMenu);
    
    if(this.productosDelMenu.length>0 && this.productosActivos.length>0){
      console.log("entra");
      
      this.productosDelMenu.forEach(menuProducto => {
        this.productosActivos.forEach(productoActivo => {
          if(menuProducto.producto.id==productoActivo.id){
            
            
            delete this.productosActivos[this.productosActivos.indexOf(productoActivo)];
          }
        });
      });
      
    }
  }

  seleccionaProducto(producto:Producto){
    console.log(this.productoMenu);
    
    let menuProducto:MenuProducto = new MenuProducto(null, this.idMenu, 1, producto);
    this.productosDelMenu.push(menuProducto);
    this.productosActivos.splice(this.productosActivos.indexOf(producto), 1);
    console.log(this.productoMenu);
 }

  quitarProducto(menuProducto:MenuProducto){
    
    this.productosActivos.push(menuProducto.producto);
    this.productosDelMenu.splice(this.productosDelMenu.indexOf(menuProducto), 1);
    
  }

  aumentaCantidad(menuProducto:MenuProducto){
    if(menuProducto.cantidad<10){
      this.productosDelMenu[this.productosDelMenu.indexOf(menuProducto)].cantidad++;
    }
    
  }
  disminuyeCantidad(menuProducto:MenuProducto){
    if(menuProducto.cantidad>1){
      this.productosDelMenu[this.productosDelMenu.indexOf(menuProducto)].cantidad--;
    }
  }

  async cerrarModal() {
    this.productoMenu=this.productosDelMenu;
    await this.modalController.dismiss();
  }
}
