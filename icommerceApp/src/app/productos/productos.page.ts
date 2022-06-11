import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';
import { AppComponent } from '../app.component';
import { CrearProductoPage } from '../modales/productos/crear-producto/crear-producto.page';
import { Cliente } from '../modelo/Cliente';
import { Empleado } from '../modelo/Empleado';
import { Producto } from '../modelo/Producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  productos: Array<Producto>;
  activos:boolean;
  clienteActual:Cliente;
  empleadoActual:Empleado;
  constructor(private apiProvider: ApiServiceProvider, private modalController: ModalController, private appComponent:AppComponent) { 
    this.productos = new Array<Producto>();
    this.activos=false;
    if(this.appComponent.cliente!=null){
      this.clienteActual=this.appComponent.cliente;
    }else{
      this.empleadoActual=this.appComponent.empleado;
    }
  }

  ngOnInit() {
  }

  mostrarActivos(){
    this.activos=!this.activos;
  }

  ionViewWillEnter() {
    this.apiProvider.getProductos()
      .then((respuesta: any) => {    
        this.productos= new Array<Producto>();
        respuesta.forEach(productoJson => {
          
          let producto:Producto =  Producto.createFromJsonObject(productoJson);
     
          
          this.productos.push(producto);
        });
      });
    
  }

  async anadirProducto(productoSelec: Producto) {
    const modal = await this.modalController.create({
      component: CrearProductoPage,
      componentProps: {
        'producto': productoSelec
      }
    });

    modal.onWillDismiss().then(dataReturned => {
      this.apiProvider.getProductos()
      .then((respuesta: any) => {
        this.productos= new Array<Producto>();
        respuesta.forEach(productoJson => {
          let producto = Producto.createFromJsonObject(productoJson);
          this.productos.push(producto);
        });
      });
    });

    return await modal.present();
  }

  deleteProducto(productoSelec: Producto) {    
    this.apiProvider.deleteProducto(productoSelec)
      .then((respuesta: any) => {
        this.apiProvider.getProductos()
        .then((respuesta: any) => {
          this.productos= new Array<Producto>();
          respuesta.forEach(productoJson => {
            let producto = Producto.createFromJsonObject(productoJson);
            this.productos.push(producto);
          });
        });
      });

  }
}
