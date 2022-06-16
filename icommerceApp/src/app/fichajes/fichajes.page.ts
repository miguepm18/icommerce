import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';
import { AppComponent } from '../app.component';
import { CrearFichajePage } from '../modales/fichajes/crear-fichaje/crear-fichaje.page';
import { Cliente } from '../modelo/Cliente';
import { Empleado } from '../modelo/Empleado';
import { Fichaje } from '../modelo/Fichaje';

@Component({
  selector: 'app-fichajes',
  templateUrl: './fichajes.page.html',
  styleUrls: ['./fichajes.page.scss'],
})
export class FichajesPage implements OnInit {

  fichajes: Array<Fichaje>;
  activos: boolean;
  clienteActual: Cliente;
  empleadoActual: Empleado;

  constructor(private apiProvider: ApiServiceProvider, private modalController: ModalController, private appComponent: AppComponent) {
    this.fichajes = new Array<Fichaje>();
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
    if (this.empleadoActual.esAdministrador) {
      this.apiProvider.getFichajes()
        .then((respuesta: any) => {
          this.fichajes = new Array<Fichaje>();
          respuesta.forEach(fichajeJson => {

            let fichaje: Fichaje = Fichaje.createFromJsonObject(fichajeJson);


            this.fichajes.push(fichaje);
          });
        });
    } else {
      this.apiProvider.getFichajesEmpleado(this.empleadoActual)
        .then((respuesta: any) => {
          this.fichajes = new Array<Fichaje>();
          respuesta.forEach(fichajeJson => {
            console.log(fichajeJson);

            let fichaje: Fichaje = Fichaje.createFromJsonObject(fichajeJson);

            if (fichaje.activo) {
              this.fichajes.push(fichaje);
            }
          });
        });
    }



  }

  async anadirFichaje(fichajeSelec: Fichaje) {
    let empleados: Array<Empleado> = new Array<Empleado>();
    this.apiProvider.getEmpleados()
      .then((respuesta: any) => {
        respuesta.forEach(empleadoJson => {
          let empleado = Empleado.createFromJsonObject(empleadoJson);
          if (empleado.activo && !empleado.esAdministrador) {
            empleados.push(empleado);
          }
        });
      });
    console.log(empleados);
    if (fichajeSelec != null) {
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
            this.fichajes = new Array<Fichaje>();
            respuesta.forEach(fichajeJson => {
              let fichaje = Fichaje.createFromJsonObject(fichajeJson);
              this.fichajes.push(fichajeJson);
            });
          });
      });

      return await modal.present();
    } else {
      const modal = await this.modalController.create({
        component: CrearFichajePage,
        componentProps: {
          'fichaje': fichajeSelec,
          'empleados': empleados
        }
      });
      modal.onWillDismiss().then(dataReturned => {
        this.apiProvider.getFichajes()
          .then((respuesta: any) => {
            this.fichajes = new Array<Fichaje>();
            respuesta.forEach(fichajeJson => {
              let fichaje = Fichaje.createFromJsonObject(fichajeJson);
              this.fichajes.push(fichajeJson);
            });
          });
      });

      return await modal.present();
    }



  }

  nombreEmpleadoID(idEmpleado: number) {
    let empleado: Empleado = new Empleado(null, null, null, null, null, null, null, null, null, null, null, null);
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
            this.fichajes = new Array<Fichaje>();
            respuesta.forEach(fichajeJson => {
              let fichaje = Fichaje.createFromJsonObject(fichajeJson);
              this.fichajes.push(fichaje);
            });
          });
      });

  }

  nuevoFichaje() {
    let nuevoFichaje: Fichaje = new Fichaje(null, moment().format('DD-MM-YY HH:mm:ss'), true, null, this.empleadoActual);
    this.apiProvider.registrarFichaje(nuevoFichaje)
      .then((respuesta: any) => {
        this.fichajes.push(Fichaje.createFromJsonObject(respuesta));
      });
  }

  cerrarFichaje() {
    this.fichajes[this.fichajes.length - 1].horaSalida = moment().format('DD-MM-YY HH:mm:ss');
    this.apiProvider.modificarFichaje(this.fichajes[this.fichajes.length - 1])
      .then((respuesta: any) => {

        this.apiProvider.getFichajesEmpleado(this.empleadoActual)
          .then((respuesta: any) => {
            this.fichajes = new Array<Fichaje>();
            respuesta.forEach(fichajeJson => {
              console.log(fichajeJson);

              let fichaje: Fichaje = Fichaje.createFromJsonObject(fichajeJson);

              if (fichaje.activo) {
                this.fichajes.push(fichaje);
              }
            });
          });



      });
  }

}
