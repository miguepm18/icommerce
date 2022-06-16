import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';
import { AppComponent } from '../app.component';
import { CrearProductoPage } from '../modales/productos/crear-producto/crear-producto.page';
import { Cliente } from '../modelo/Cliente';
import { Empleado } from '../modelo/Empleado';
import { Pedido } from '../modelo/Pedido';
import { PedidoProducto } from '../modelo/PedidoProducto';
import { Producto } from '../modelo/Producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  productos: Array<Producto>;
  activos: boolean;
  clienteActual: Cliente;
  empleadoActual: Empleado;
  constructor(private apiProvider: ApiServiceProvider, private modalController: ModalController, private appComponent: AppComponent) {
    this.productos = new Array<Producto>();
    this.activos = false;
    if (this.appComponent.cliente != null) {
      this.clienteActual = this.appComponent.cliente;
    } else {
      this.empleadoActual = this.appComponent.empleado;
    }
  }

  ngOnInit() {
  }

  mostrarActivos() {
    this.activos = !this.activos;
  }

  ionViewWillEnter() {
    if (this.empleadoActual != null) {
      this.apiProvider.getProductos()
        .then((respuesta: any) => {
          this.productos = new Array<Producto>();
          respuesta.forEach(productoJson => {

            let producto: Producto = Producto.createFromJsonObject(productoJson);


            this.productos.push(producto);
          });
        });
    } else {
      this.apiProvider.getProductos()
        .then((respuesta: any) => {
          this.productos = new Array<Producto>();
          respuesta.forEach(productoJson => {

            let producto: Producto = Producto.createFromJsonObject(productoJson);

            if (producto.activo) {
              this.productos.push(producto);
            }

          });
        });
    }

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
          this.productos = new Array<Producto>();
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
            this.productos = new Array<Producto>();
            respuesta.forEach(productoJson => {
              let producto = Producto.createFromJsonObject(productoJson);
              this.productos.push(producto);
            });
          });
      });

  }

  anadirACesta(producto: Producto) {
    let pedidosCliente: Array<Pedido> = new Array<Pedido>();
    this.apiProvider.getPedidosDelCliente(this.clienteActual)
      .then((respuesta: any) => {

        respuesta.forEach(pedidoJson => {
          let pedido = Pedido.createFromJsonObject(pedidoJson);
          if (pedido.activo) {
            pedidosCliente.push(pedido);
          }
        });
        //Compruebo que el ultimo pedido 


        if (pedidosCliente != null && pedidosCliente.length > 0 && pedidosCliente[pedidosCliente.length - 1].estado === "enCurso") {
          let enc: boolean = false;
          let pedidoProductoAux:PedidoProducto;
          pedidosCliente[pedidosCliente.length - 1].productos.forEach(pedidoProducto => {
            
            
            if (pedidoProducto.producto.id == producto.id) {
              enc = true;
              pedidoProductoAux=pedidoProducto;
            }            
          });

          if(enc){
            pedidosCliente[pedidosCliente.length - 1].productos[pedidosCliente[pedidosCliente.length - 1].productos.indexOf(pedidoProductoAux)].cantidad++;
            pedidosCliente[pedidosCliente.length - 1].precio += producto.precio;
          }else{
              let nuevoPedidoProducto: PedidoProducto = new PedidoProducto(null, pedidosCliente[pedidosCliente.length - 1].id, 1, producto);
              pedidosCliente[pedidosCliente.length - 1].productos.push(nuevoPedidoProducto);
              pedidosCliente[pedidosCliente.length - 1].precio += producto.precio;       
          }
          this.apiProvider.modificarPedido(pedidosCliente[pedidosCliente.length - 1])
            .then((respuesta: any) => {
              console.log(respuesta);
            });
        } else {
          let productos: Array<PedidoProducto> = new Array<PedidoProducto>();
          let pedido: Pedido = new Pedido(null, "online", moment().format('DD-MM-YY HH:mm:ss'), null, "enCurso", true, null, 0, this.clienteActual.direccion, productos, this.clienteActual, null);
          this.apiProvider.registrarPedido(pedido)
            .then((respuesta: any) => {
              pedido = Pedido.createFromJsonObject(respuesta);
              let nuevoPedidoProductoNuevo:PedidoProducto = new PedidoProducto(null, pedido.id, 1, producto);
              pedido.productos.push(nuevoPedidoProductoNuevo);
              pedido.precio+=producto.precio;
              

              this.apiProvider.modificarPedido(pedido)
                .then((respuesta: any) => {
                  console.log(respuesta);

                });
            });

        }
      });

  }
}
