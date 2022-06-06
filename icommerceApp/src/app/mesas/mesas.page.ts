import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';
import { CrearMesaPage } from '../modales/mesas/crear-mesa/crear-mesa.page';
import { Mesa } from '../modelo/Mesa';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.page.html',
  styleUrls: ['./mesas.page.scss'],
})
export class MesasPage implements OnInit {

  mesas: Array<Mesa>;
  activos:boolean;
  constructor( private apiProvider: ApiServiceProvider, private modalController: ModalController) {
    this.mesas = new Array<Mesa>();
    this.activos=false;
   }

  ngOnInit() {
  }

  mostrarActivos(){
    this.activos=!this.activos;
  }

  ionViewWillEnter() {
    this.apiProvider.getMesas()
      .then((respuesta: any) => {    
        this.mesas= new Array<Mesa>();
        respuesta.forEach(mesaJson => {
          
          let mesa:Mesa =  Mesa.createFromJsonObject(mesaJson);
     
          
          this.mesas.push(mesa);
        });
      });
    
  }


  async anadirMesa(mesaSelec: Mesa) {
    const modal = await this.modalController.create({
      component: CrearMesaPage,
      componentProps: {
        'mesa': mesaSelec
      }
    });

    modal.onWillDismiss().then(dataReturned => {
      this.apiProvider.getMesas()
      .then((respuesta: any) => {
        this.mesas= new Array<Mesa>();
        respuesta.forEach(mesaJson => {
          let mesa = Mesa.createFromJsonObject(mesaJson);
          this.mesas.push(mesa);
        });
      });
    });

    return await modal.present();
  }

  deleteMesa(mesaSelec: Mesa) {
    this.apiProvider.deleteMesa(mesaSelec)
      .then((respuesta: any) => {
        this.apiProvider.getMesas()
        .then((respuesta: any) => {
          this.mesas= new Array<Mesa>();
          respuesta.forEach(mesaJson => {
            let mesa = Mesa.createFromJsonObject(mesaJson);
            this.mesas.push(mesa);
          });
        });
      });

  }

}
