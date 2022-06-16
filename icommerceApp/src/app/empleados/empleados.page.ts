import { Component, OnInit } from '@angular/core';
import { IonFab, MenuController, ModalController } from '@ionic/angular';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';
import { CrearEmpleadoPage } from '../modales/empleados/crear-empleado/crear-empleado.page';
import { Empleado } from '../modelo/Empleado';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {

  empleados: Array<Empleado>;
  activos:boolean;
  constructor(private apiProvider: ApiServiceProvider, private modalController: ModalController, private menu:MenuController) {
    this.empleados = new Array<Empleado>();
    this.activos=false;
  }

  ngOnInit() {
    this.menu.enable(true, 'empleado');
  }
  mostrarActivos(){
    this.activos=!this.activos;
  }

  ionViewWillEnter() {
    this.apiProvider.getEmpleados()
      .then((respuesta: any) => {
        this.empleados= new Array<Empleado>();
        console.log(respuesta);
        
        respuesta.forEach(empleadoJson => {
          let empleado = Empleado.createFromJsonObject(empleadoJson);
          this.empleados.push(empleado);
        });
      });
  }

  async anadirEmpleado(empleadoSelec: Empleado) {
    const modal = await this.modalController.create({
      component: CrearEmpleadoPage,
      componentProps: {
        'empleado': empleadoSelec
      }
    });

    modal.onWillDismiss().then(dataReturned => {
      this.apiProvider.getEmpleados()
        .then((respuesta: any) => {
          this.empleados= new Array<Empleado>();
          respuesta.forEach(empleadoJson => {
            let empleado = Empleado.createFromJsonObject(empleadoJson);
            this.empleados.push(empleado);
          });
        });
    });

    return await modal.present();
  }

  deleteEmpleado(empleadoSelec: Empleado) {
    this.apiProvider.deleteEmpleado(empleadoSelec)
      .then((respuesta: any) => {
        this.apiProvider.getEmpleados()
          .then((respuesta: any) => {
            this.empleados= new Array<Empleado>();
            respuesta.forEach(empleadoJson => {
              let empleado = Empleado.createFromJsonObject(empleadoJson);
              this.empleados.push(empleado);
            });
          });
      });

  }

}
