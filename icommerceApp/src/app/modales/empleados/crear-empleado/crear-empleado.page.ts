import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';
import { Empleado } from 'src/app/modelo/Empleado';
import { Pedido } from 'src/app/modelo/Pedido';
import { Mesa } from 'src/app/modelo/Mesa';
import { Fichaje } from 'src/app/modelo/Fichaje';
@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.page.html',
  styleUrls: ['./crear-empleado.page.scss'],
})
export class CrearEmpleadoPage implements OnInit {

  validations_form: FormGroup;
  usuarioValido: boolean;

  constructor(private modalController: ModalController, public formBuilder: FormBuilder, private apiService: ApiServiceProvider, private alertController: AlertController) { }

  @Input() public empleado: Empleado;

  ngOnInit() {
    console.log(this.empleado);

    this.usuarioValido = null;
    if (this.empleado != null) {
      this.validations_form = this.formBuilder.group({
        activo: new FormControl(this.empleado.activo, Validators.compose([
          Validators.required
        ])),
        apellidos: new FormControl(this.empleado.apellidos, Validators.compose([
          Validators.required
        ])),
        direccion: new FormControl(this.empleado.direccion, Validators.compose([
          Validators.required
        ])),
        dni: new FormControl(this.empleado.dni, Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$')
        ])),
        email: new FormControl(this.empleado.email, Validators.compose([
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')
        ])),
        movil: new FormControl(this.empleado.movil, Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]{9}$')
        ])),
        nombre: new FormControl(this.empleado.nombre, Validators.compose([
          Validators.required
        ])),
        usuario: new FormControl(this.empleado.usuario, Validators.compose([
          Validators.required
        ])),
        tipo: new FormControl(this.empleado.esAdministrador ? 'administrador' : this.empleado.esRepartidor ? 'repartidor' : 'enTienda', Validators.compose([
          Validators.required
        ]))
      });
    } else {
      this.validations_form = this.formBuilder.group({
        activo: new FormControl(false, Validators.compose([
          Validators.required
        ])),
        apellidos: new FormControl('', Validators.compose([
          Validators.required
        ])),
        direccion: new FormControl('', Validators.compose([
          Validators.required
        ])),
        dni: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$')
        ])),
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')
        ])),
        movil: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]{9}$')
        ])),
        nombre: new FormControl('', Validators.compose([
          Validators.required
        ])),
        password: new FormControl('', Validators.compose([
          Validators.required
        ])),
        usuario: new FormControl('', Validators.compose([
          Validators.required
        ])),
        tipo: new FormControl('', Validators.compose([
          Validators.required
        ]))
      });
    }
    if (this.empleado != null && this.empleado.usuario === this.validations_form.controls['usuario'].value) {
      this.usuarioValido = true;
    }
  }

  async cerrarModal() {
    await this.modalController.dismiss();
  }

  onSubmit(values) {
    let empleado: Empleado = Empleado.createFromJsonObject(values);
    if (values['tipo'] === "administrador") {
      empleado.esAdministrador = true;
      empleado.esRepartidor = false;
    }
    if (values['tipo'] === "repartidor") {
      empleado.esAdministrador = false;
      empleado.esRepartidor = true;
    }
    if (values['tipo'] === "enTienda") {
      empleado.esAdministrador = false;
      empleado.esRepartidor = false;
    }
    
    if (this.empleado == null) {
      this.apiService.registrarEmpleado(empleado)
        .then((respuesta: any) => {
          this.mostrarAlert("Empleado creado correctamente.");
        });
    } else {
      empleado.id = this.empleado.id;
      console.log(empleado);

      this.apiService.modificarEmpleado(empleado)
        .then((respuesta: any) => {
          this.mostrarAlert("Empleado modificado correctamente.");
        });
    }

  }

  compruebaUsuario(fcUsuario: string) {
    if (this.empleado != null && this.empleado.usuario === fcUsuario) {
      this.usuarioValido = true;
      return;
    }
    this.apiService.compruebaUsuarioCliente(fcUsuario)
      .then((respuesta: boolean) => {
        if (respuesta) {
          this.usuarioValido = false;
        } else {
          this.apiService.compruebaUsuarioEmpleado(fcUsuario)
            .then((respuesta: boolean) => {
              if (respuesta) {
                this.usuarioValido = false;
              } else {
                this.usuarioValido = true;
              }
            })
            .catch((error: string) => {
              console.log(error);
            });
        }
      })
      .catch((error: string) => {
        console.log(error);
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


}
