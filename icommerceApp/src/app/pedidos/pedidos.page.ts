import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';
import { AppComponent } from '../app.component';
import { CrearPedidoPage } from '../modales/pedidos/crear-pedido/crear-pedido.page';
import { Cliente } from '../modelo/Cliente';
import { Empleado } from '../modelo/Empleado';
import { Mesa } from '../modelo/Mesa';
import { Pedido } from '../modelo/Pedido';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  pedidos: Array<Pedido>;
  activos: boolean;
  clienteActual:Cliente;
  empleadoActual:Empleado;
  constructor(private apiProvider: ApiServiceProvider, private modalController: ModalController, private appComponent:AppComponent) {
    this.pedidos = new Array<Pedido>();
    this.activos = false;

    if(this.appComponent.cliente!=null){
      this.clienteActual=this.appComponent.cliente;
    }else{
      this.empleadoActual=this.appComponent.empleado;
    }
  }

  ngOnInit() {
  }

  mostrarActivos() {
    this.activos = !this.activos;
  }


  ionViewWillEnter() {
    if(this.empleadoActual.esRepartidor){
      this.apiProvider.getPedidos()
      .then((respuesta: any) => {
        this.pedidos = new Array<Pedido>();
        respuesta.forEach(pedidoJson => {

          let pedido: Pedido = Pedido.createFromJsonObject(pedidoJson);
          if((pedido.tipo==='online' && pedido.empleado==null && pedido.estado!=='enCurso' && pedido.estado!=='finalizado') || (pedido.tipo==='online' && pedido.empleado!=null && pedido.empleado.id == this.empleadoActual.id && pedido.estado!=='enCurso' && pedido.estado!=='finalizado')){
            this.pedidos.push(pedido);
          }
          
        });
      });
    }else{
      this.apiProvider.getPedidos()
      .then((respuesta: any) => {
        this.pedidos = new Array<Pedido>();
        respuesta.forEach(pedidoJson => {

          let pedido: Pedido = Pedido.createFromJsonObject(pedidoJson);

          this.pedidos.push(pedido);
        });
      });
    }

  }

  async anadirPedido(pedidoSelec: Pedido) {
    let mesa: Mesa = new Mesa(null, null, null, null, null, null, null);
    if(pedidoSelec!=null){
      this.apiProvider.getMesaId(pedidoSelec.mesaID)
      .then((respuesta: any) => {
        mesa = Mesa.createFromJsonObject(respuesta);
      });
    }
    if(pedidoSelec!=null){
      if (pedidoSelec.tipo === "tienda") {
        console.log(pedidoSelec.productos);
        
        const modal = await this.modalController.create({
          component: CrearPedidoPage,
          componentProps: {
            'pedido': pedidoSelec,
            'empleado': pedidoSelec.empleado,
            'mesa': mesa
          }
        });
  
        modal.onWillDismiss().then(dataReturned => {
          this.apiProvider.getPedidos()
            .then((respuesta: any) => {
              this.pedidos = new Array<Pedido>();
              respuesta.forEach(pedidoJson => {
                let pedido: Pedido = Pedido.createFromJsonObject(pedidoJson);
                this.pedidos.push(pedido);
              });
            });
        });
  
        return await modal.present();
  
      } else {
  
        console.log(pedidoSelec.productos);
          const modal = await this.modalController.create({
            component: CrearPedidoPage,
            componentProps: {
              'pedido': pedidoSelec,
              'cliente': pedidoSelec.cliente
            }
          });
  
          modal.onWillDismiss().then(dataReturned => {
            this.apiProvider.getPedidos()
              .then((respuesta: any) => {
                this.pedidos = new Array<Pedido>();
                respuesta.forEach(pedidoJson => {
                  let pedido: Pedido = Pedido.createFromJsonObject(pedidoJson);
                  this.pedidos.push(pedido);
                });
              });
          });
      
          return await modal.present();
      }
    }else{
      const modal = await this.modalController.create({
        component: CrearPedidoPage,
        componentProps: {
          
        }
      });

      modal.onWillDismiss().then(dataReturned => {
        this.apiProvider.getPedidos()
          .then((respuesta: any) => {
            this.pedidos = new Array<Pedido>();
            respuesta.forEach(pedidoJson => {
              let pedido: Pedido = Pedido.createFromJsonObject(pedidoJson);
              this.pedidos.push(pedido);
            });
          });
      });
  
      return await modal.present();
    }
    



    
  }

  deletePedido(pedidoSelec: Pedido) {
    this.apiProvider.deletePedido(pedidoSelec)
      .then((respuesta: any) => {
        this.apiProvider.getPedidos()
          .then((respuesta: any) => {
            this.pedidos = new Array<Pedido>();
            respuesta.forEach(pedidoJson => {
              let pedido: Pedido = Pedido.createFromJsonObject(pedidoJson);
              this.pedidos.push(pedido);
            });
          });
      });

  }

  repartirPedido(pedido:Pedido){
    pedido.horaSalida=moment().format('DD-MM-YY HH:mm:ss');
    pedido.estado="enReparto";
    pedido.empleado=this.empleadoActual;
    this.apiProvider.modificarPedido(pedido)
          .then((respuesta: any) => {
            
          });
  }

  entregarPedido(pedido:Pedido){
    pedido.estado="finalizado";
    this.apiProvider.modificarPedido(pedido)
          .then((respuesta: any) => {
            this.pedidos.splice(this.pedidos.indexOf(pedido), 1);
          });
  }
}
