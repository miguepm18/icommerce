import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';
import { CrearFichajePage } from '../modales/fichajes/crear-fichaje/crear-fichaje.page';
import { Empleado } from '../modelo/Empleado';
import { Fichaje } from '../modelo/Fichaje';

@Component({
  selector: 'app-fichajes',
  templateUrl: './fichajes.page.html',
  styleUrls: ['./fichajes.page.scss'],
})
export class FichajesPage implements OnInit {

  fichajes: Array<Fichaje>;
  activos:boolean;

  constructor(private apiProvider: ApiServiceProvider, private modalController: ModalController) { 
    this.fichajes = new Array<Fichaje>();
    this.activos=false;
  }

  ngOnInit() {
  }

  mostrarActivos(){
    this.activos=!this.activos;
  }

  ionViewWillEnter() {
    this.apiProvider.getFichajes()
      .then((respuesta: any) => {    
        this.fichajes= new Array<Fichaje>();
        respuesta.forEach(fichajeJson => {
          
          let fichaje:Fichaje =  Fichaje.createFromJsonObject(fichajeJson);
     
          
          this.fichajes.push(fichaje);
        });
      });
    console.log(this.fichajes);
    
  }

  async anadirFichaje(fichajeSelec: Fichaje) {

    let empleados:Array<Empleado> = new Array<Empleado>();
    this.apiProvider.getEmpleados()
      .then((respuesta: any) => {
        respuesta.forEach(empleadoJson => {
          let empleado = Empleado.createFromJsonObject(empleadoJson);
          empleados.push(empleado);
        });
      });
      console.log(empleados);
      
    const modal = await this.modalController.create({
      component: CrearFichajePage,
      componentProps: {
        'fichaje': fichajeSelec,
        'empleado': fichajeSelec.empleado,
        'empleados': empleados
      }
    });

    modal.onWillDismiss().then(dataReturned => {
      this.apiProvider.getFichajes()
      .then((respuesta: any) => {
        this.fichajes= new Array<Fichaje>();
        respuesta.forEach(fichajeJson => {
          let fichaje = Fichaje.createFromJsonObject(fichajeJson);
          this.fichajes.push(fichajeJson);
        });
      });
    });

    return await modal.present();
  }

  nombreEmpleadoID(idEmpleado:number){
    let empleado:Empleado = new Empleado(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.apiProvider.getEmpleadoId(idEmpleado)
        .then((respuesta: any) => {
          empleado = Empleado.createFromJsonObject(respuesta);
        });
    return empleado.usuario;      
  }

  deleteFichaje(fichajeSelec: Fichaje) {
    this.apiProvider.deleteFichaje(fichajeSelec)
      .then((respuesta: any) => {
        this.apiProvider.getFichajes()
        .then((respuesta: any) => {
          this.fichajes= new Array<Fichaje>();
          respuesta.forEach(fichajeJson => {
            let fichaje = Fichaje.createFromJsonObject(fichajeJson);
            this.fichajes.push(fichaje);
          });
        });
      });

  }
  

}
