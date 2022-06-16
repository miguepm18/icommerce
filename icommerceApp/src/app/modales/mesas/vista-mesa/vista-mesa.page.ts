import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Mesa } from 'src/app/modelo/Mesa';
import {Pedido} from 'src/app/modelo/Pedido';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';
import * as moment from 'moment';
import { Producto } from 'src/app/modelo/Producto';
import { Cliente } from 'src/app/modelo/Cliente';
import { PedidoProducto } from 'src/app/modelo/PedidoProducto';
import { AnadirMenuMesaPage } from '../anadir-menu-mesa/anadir-menu-mesa.page';
import { AnadirProductoMesaPage } from '../anadir-producto-mesa/anadir-producto-mesa.page';

@Component({
  selector: 'app-vista-mesa',
  templateUrl: './vista-mesa.page.html',
  styleUrls: ['./vista-mesa.page.scss'],
})
export class VistaMesaPage implements OnInit {

  @Input() mesa: Mesa;
  constructor(private modalController: ModalController, public formBuilder: FormBuilder, private apiService: ApiServiceProvider, private alertController: AlertController) { }

  ngOnInit() {
    console.log(this.mesa);
  }

  async cerrarModal() {

    
    this.apiService.modificarMesa(this.mesa)
        .then(async (respuesta: any) => {
          console.log("Mesa modificada:");
          console.log(Mesa.createFromJsonObject(respuesta));      
          await this.modalController.dismiss()    
          });
    
    
  }

  async mostrarAlert(texto: string) {
    this.alertController.create({
      header: 'Información',
      message: texto,
      buttons: [
        {
          text: 'Aceptar',
          id: 'confirm-button',
          handler: () => {
            this.cerrarModal();
          }
        }
      ]
    }).then(alertEt => {
      alertEt.present();
    })
  }

  clientesEnMesa(){
    if(this.mesa.pedidos==null){
      this.mesa.pedidos = new Array<Pedido>();
    }
    this.mesa.ocupada=true;
    let productosPedido:Array<PedidoProducto> = new Array<PedidoProducto>();
    let nuevoPedido:Pedido = new Pedido(null, "tienda",moment().format('DD-MM-YY HH:mm:ss'), null, "enCurso", true, this.mesa.id, 0,"",productosPedido, null, this.mesa.empleado);
    this.mesa.pedidos.push(nuevoPedido);
    this.mesa.cuenta=nuevoPedido.precio;
    this.cerrarModal();
  }


  async addMenu(){
    const modal = await this.modalController.create({
      component: AnadirMenuMesaPage,
      componentProps:{
        'mesa': this.mesa
      }
    });

    modal.onWillDismiss().then(dataReturned => {
      
    });

    return await modal.present();
    
  }

  async addProducto(pedido:Pedido){
    const modal = await this.modalController.create({
      component: AnadirProductoMesaPage,
      componentProps:{
        'productosPedido': pedido.productos,
        'pedido': pedido,
        'mesa': this.mesa
      }
    });

    modal.onWillDismiss().then(dataReturned => {
      
    });

    return await modal.present();
  }

  finalizarPedido(){
    this.mesa.pedidos[this.mesa.pedidos.length-1].estado="finalizado";
    this.mesa.pedidos[this.mesa.pedidos.length-1].horaSalida=moment().format('DD-MM-YY HH:mm:ss');
    this.mesa.ocupada=false;
    this.mesa.cuenta=0;
    this.cerrarModal();
    
  }
}
