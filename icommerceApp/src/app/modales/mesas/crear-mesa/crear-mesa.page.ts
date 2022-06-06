import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Empleado } from 'src/app/modelo/Empleado';
import { Mesa } from 'src/app/modelo/Mesa';
import { Pedido } from 'src/app/modelo/Pedido';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';

@Component({
  selector: 'app-crear-mesa',
  templateUrl: './crear-mesa.page.html',
  styleUrls: ['./crear-mesa.page.scss'],
})
export class CrearMesaPage implements OnInit {

  validations_form: FormGroup;
  empleadoAsignado: Empleado;
  empleados: Array<Empleado>;
  
  @Input() public mesa: Mesa;
  

  constructor(private modalController: ModalController, public formBuilder: FormBuilder, private apiService: ApiServiceProvider, private alertController: AlertController) {
    this.empleados = new Array<Empleado>();
    this.empleadoAsignado = new Empleado(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.apiService.getEmpleados()
      .then((respuesta: any) => {
        respuesta.forEach(empleadoJson => {
          let empleado: Empleado = Empleado.createFromJsonObject(empleadoJson);
          this.empleados.push(empleado);
        });
      });

    
  }

  

  ngOnInit() {

    if (this.mesa!=null && this.mesa.empleadoID != null) {
      this.apiService.getEmpleadoId(this.mesa.empleadoID)
        .then((respuesta: any) => {
          this.empleadoAsignado = Empleado.createFromJsonObject(respuesta);
        });
    }

    let empleadosAux: Array<Empleado> = new Array<Empleado>();
    this.empleados.forEach(empleado => {
      if (!empleado.esAdministrador && !empleado.esRepartidor) {
        empleadosAux.push(empleado);
      }
    });
    this.empleados = empleadosAux;

    if (this.mesa != null) {
      if (this.mesa.empleadoID != null) {
        
        this.validations_form = this.formBuilder.group({
          activo: new FormControl(this.mesa.activo, Validators.compose([
            Validators.required
          ])),
          capacidad: new FormControl(this.mesa.capacidad, Validators.compose([
            Validators.required
          ])),
          ocupada: new FormControl(this.mesa.ocupada, Validators.compose([
            Validators.required
          ])),
          empleadoMesa: new FormControl(this.empleadoAsignado.usuario, Validators.compose([
            Validators.required
          ]))
        });
      } else {
        this.validations_form = this.formBuilder.group({
          activo: new FormControl(this.mesa.activo, Validators.compose([
            Validators.required
          ])),
          capacidad: new FormControl(this.mesa.capacidad, Validators.compose([
            Validators.required
          ])),
          ocupada: new FormControl(this.mesa.ocupada, Validators.compose([
            Validators.required
          ])),
          empleadoMesa: new FormControl("noAsignado", Validators.compose([
            Validators.required
          ]))
        });
      }

    } else {
      this.validations_form = this.formBuilder.group({
        activo: new FormControl(false, Validators.compose([
          Validators.required
        ])),
        capacidad: new FormControl(1, Validators.compose([
          Validators.required
        ])),
        ocupada: new FormControl(false, Validators.compose([

        ])),
        empleadoMesa: new FormControl("noAsignado", Validators.compose([
          Validators.required
        ]))
      });
    }

  }

  async cerrarModal() {
    await this.modalController.dismiss();
  }

  onSubmit(values) {
    let mesa: Mesa = Mesa.createFromJsonObject(values);
    let emp: Empleado = new Empleado(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);;
    this.empleados.forEach(empleado => {
      if (empleado.usuario === values['empleadoMesa']) {
        emp = empleado;
      }
    });
    mesa.empleadoID = emp.id;
    if (this.mesa == null) {
      mesa.pedidos = new Array<Pedido>();
    }
    if (this.mesa == null && values['empleadoMesa'] === "noAsignado") {
      delete this.mesa.empleadoID
    }
    if (this.mesa == null) {
      this.apiService.registrarMesa(mesa)
        .then((respuesta: any) => {
          this.mostrarAlert("Mesa creada correctamente.");
        });
    } else {
      mesa.id = this.mesa.id;

      this.apiService.modificarMesa(mesa)
        .then((respuesta: any) => {
          this.mostrarAlert("Mesa modificada correctamente.");
        });
    }

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

}
