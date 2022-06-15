import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';
import { AppComponent } from '../app.component';
import { CrearMesaPage } from '../modales/mesas/crear-mesa/crear-mesa.page';
import { VistaMesaPage } from '../modales/mesas/vista-mesa/vista-mesa.page';
import { Cliente } from '../modelo/Cliente';
import { Empleado } from '../modelo/Empleado';
import { Mesa } from '../modelo/Mesa';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.page.html',
  styleUrls: ['./mesas.page.scss'],
})
export class MesasPage implements OnInit {

  mesas: Array<Mesa>;
  activos:boolean;
  clienteActual:Cliente;
  empleadoActual:Empleado;
  constructor( private apiProvider: ApiServiceProvider, private modalController: ModalController, private appComponent:AppComponent) {
    this.mesas = new Array<Mesa>();
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
    this.apiProvider.getMesas()
      .then((respuesta: any) => {    
        this.mesas= new Array<Mesa>();
        respuesta.forEach(mesaJson => {
          
          let mesa:Mesa =  Mesa.createFromJsonObject(mesaJson);
          if(!this.empleadoActual.esAdministrador && !this.empleadoActual.esRepartidor && this.clienteActual ==null){
            if(mesa.empleado.id==this.empleadoActual.id && mesa.activo){
              this.mesas.push(mesa);
            }
          }else{
            this.mesas.push(mesa);
          }
        });
      });
    
  }


  async anadirMesa(mesaSelec: Mesa) {
    let empleados:Array<Empleado> = new Array<Empleado>();
    this.apiProvider.getEmpleados()
      .then((respuesta: any) => {
        respuesta.forEach(empleadoJson => {
          let empleado: Empleado = Empleado.createFromJsonObject(empleadoJson);
          if(!empleado.esAdministrador && !empleado.esRepartidor){
            empleados.push(empleado);
          }
          
        });
      });

    const modal = await this.modalController.create({
      component: CrearMesaPage,
      componentProps: {
        'mesa': mesaSelec,
        'empleados': empleados
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

  async vistaMesa(mesa: Mesa) {

    const modal = await this.modalController.create({
      component: VistaMesaPage,
      componentProps: {
        'mesa': mesa
      }
    });

    modal.onWillDismiss().then(dataReturned => {
      this.mesas= new Array<Mesa>();
      this.apiProvider.getMesas()
      .then((respuesta: any) => {    
        
        respuesta.forEach(mesaJson => {
          
          let mesa:Mesa =  Mesa.createFromJsonObject(mesaJson);
          if(!this.empleadoActual.esAdministrador && !this.empleadoActual.esRepartidor && this.clienteActual ==null){
            if(mesa.empleado.id==this.empleadoActual.id && mesa.activo){
              console.log("entra");
              
              this.mesas.push(mesa);
            }
          }else{
            this.mesas.push(mesa);
          }
        });
      });
    });

    return await modal.present();
  }

}
