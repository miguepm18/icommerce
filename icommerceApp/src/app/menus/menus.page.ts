import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';
import { AppComponent } from '../app.component';
import { CrearMenuPage } from '../modales/menus/crear-menu/crear-menu.page';
import { Cliente } from '../modelo/Cliente';
import { Empleado } from '../modelo/Empleado';
import { Menu } from '../modelo/Menu';
import { Pedido } from '../modelo/Pedido';
import { PedidoProducto } from '../modelo/PedidoProducto';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.page.html',
  styleUrls: ['./menus.page.scss'],
})
export class MenusPage implements OnInit {

  menus: Array<Menu>;
  activos: boolean;
  clienteActual: Cliente;
  empleadoActual: Empleado;

  constructor(private apiProvider: ApiServiceProvider, private modalController: ModalController, private appComponent: AppComponent) {
    this.menus = new Array<Menu>();
    this.activos = false;
    if (this.appComponent.cliente != null) {
      this.clienteActual = appComponent.cliente;
    } else {
      this.empleadoActual = appComponent.empleado;
    }
    console.log(this.empleadoActual);
    console.log(this.clienteActual);


  }

  ngOnInit() {
  }

  mostrarActivos() {
    this.activos = !this.activos;
  }

  ionViewWillEnter() {
    this.apiProvider.getMenus()
      .then((respuesta: any) => {
        console.log(respuesta);
        this.menus = new Array<Menu>();
        respuesta.forEach(menuJson => {

          let menu: Menu = Menu.createFromJsonObject(menuJson);
          if (this.empleadoActual == null || !this.empleadoActual.esAdministrador) {
            if (menu.activo) {
              this.menus.push(menu);
            }
          } else {
            this.menus.push(menu);
          }
        });
      });

  }

  async anadirMenu(menuSelec: Menu) {
    const modal = await this.modalController.create({
      component: CrearMenuPage,
      componentProps: {
        'menu': menuSelec
      }
    });

    modal.onWillDismiss().then(dataReturned => {
      this.apiProvider.getMenus()
        .then((respuesta: any) => {
          this.menus = new Array<Menu>();
          respuesta.forEach(menuJson => {
            let menu = Menu.createFromJsonObject(menuJson);
            this.menus.push(menu);
          });
        });
    });

    return await modal.present();
  }

  deleteMenu(menuSelec: Menu) {
    this.apiProvider.deleteMenu(menuSelec)
      .then((respuesta: any) => {
        this.apiProvider.getMenus()
          .then((respuesta: any) => {
            this.menus = new Array<Menu>();
            respuesta.forEach(menuJson => {
              let menu = Menu.createFromJsonObject(menuJson);
              this.menus.push(menu);
            });
          });
      });

  }

  anadirACesta(menu: Menu) {
    //Traigo los pedidos del cliente
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
          console.log("entra");

          //Recorro los menuProducto del menu seleccionado
          menu.productos.forEach(menuProducto => {
            let enc: boolean = false;
            //Recorro los pedidoProducto del ultimo pedido del cliente(el cual esta en curso)
            pedidosCliente[pedidosCliente.length - 1].productos.forEach(pedidoProducto => {
              if (menuProducto.producto.id == pedidoProducto.producto.id) {
                pedidoProducto.cantidad += menuProducto.cantidad;
                enc = true;
                pedidosCliente[pedidosCliente.length - 1].precio += menuProducto.producto.precio*menuProducto.cantidad;
              }
            });
            if (!enc) {
              let pedidoProducto: PedidoProducto = new PedidoProducto(null, pedidosCliente[pedidosCliente.length - 1].id, menuProducto.cantidad, menuProducto.producto);
              pedidosCliente[pedidosCliente.length - 1].productos.push(pedidoProducto);
              pedidosCliente[pedidosCliente.length - 1].precio += menuProducto.producto.precio * menuProducto.cantidad;
            }
          });
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
              menu.productos.forEach(menuProducto => {
                let pedidoProducto: PedidoProducto = new PedidoProducto(null, pedido.id, menuProducto.cantidad, menuProducto.producto);
                pedido.productos.push(pedidoProducto);
                pedido.precio += menuProducto.producto.precio * menuProducto.cantidad;
              });
              console.log(pedido);

              this.apiProvider.modificarPedido(pedido)
                .then((respuesta: any) => {
                  console.log(respuesta);

                });
            });


        }
      });


  }
}
