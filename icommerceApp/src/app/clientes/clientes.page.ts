import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';
import { CrearClientePage } from '../modales/clientes/crear-cliente/crear-cliente.page';
import { Cliente } from '../modelo/Cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  clientes: Array<Cliente>;
  activos:boolean;
  constructor( private apiProvider: ApiServiceProvider, private modalController: ModalController) { 
    this.clientes = new Array<Cliente>();
    this.activos=false;
  }

  ngOnInit() {
  }

  mostrarActivos(){
    this.activos=!this.activos;
  }

  ionViewWillEnter() {
    this.apiProvider.getClientes()
      .then((respuesta: any) => {
        this.clientes= new Array<Cliente>();
        respuesta.forEach(clienteJson => {
          let cliente = Cliente.createFromJsonObject(clienteJson);
          this.clientes.push(cliente);
        });
      });
    
  }

  async anadirCliente(clienteSelec: Cliente) {
    const modal = await this.modalController.create({
      component: CrearClientePage,
      componentProps: {
        'cliente': clienteSelec
      }
    });

    modal.onWillDismiss().then(dataReturned => {
      this.apiProvider.getClientes()
      .then((respuesta: any) => {
        this.clientes= new Array<Cliente>();
        respuesta.forEach(clienteJson => {
          let cliente = Cliente.createFromJsonObject(clienteJson);
          this.clientes.push(cliente);
        });
      });
    });

    return await modal.present();
  }

  deleteCliente(clienteSelec: Cliente) {
    this.apiProvider.deleteCliente(clienteSelec)
      .then((respuesta: any) => {
        this.apiProvider.getClientes()
          .then((respuesta: any) => {
            this.clientes= new Array<Cliente>();
            respuesta.forEach(clienteJson => {
              let cliente = Cliente.createFromJsonObject(clienteJson);
              this.clientes.push(cliente);
            });
          });
      });

  }

}
