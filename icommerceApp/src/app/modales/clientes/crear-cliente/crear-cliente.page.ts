import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Cliente } from 'src/app/modelo/Cliente';
import { Pedido } from 'src/app/modelo/Pedido';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.page.html',
  styleUrls: ['./crear-cliente.page.scss'],
})
export class CrearClientePage implements OnInit {
  validations_form: FormGroup;
  usuarioValido: boolean;

  constructor(private modalController: ModalController, public formBuilder: FormBuilder, private apiService: ApiServiceProvider, private alertController: AlertController) { }

  @Input() public cliente: Cliente;
  
  ngOnInit() {
    this.usuarioValido = null;
    if (this.cliente != null) {
      this.validations_form = this.formBuilder.group({
        activo: new FormControl(this.cliente.activo, Validators.compose([
          Validators.required
        ])),
        apellidos: new FormControl(this.cliente.apellidos, Validators.compose([
          Validators.required
        ])),
        direccion: new FormControl(this.cliente.direccion, Validators.compose([
          Validators.required
        ])),
        dni: new FormControl(this.cliente.dni, Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$')
        ])),
        email: new FormControl(this.cliente.email, Validators.compose([
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')
        ])),
        nombre: new FormControl(this.cliente.nombre, Validators.compose([
          Validators.required
        ])),
        usuario: new FormControl(this.cliente.usuario, Validators.compose([
          Validators.required
        ]))
      });
    }else{
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
        nombre: new FormControl('', Validators.compose([
          Validators.required
        ])),
        password: new FormControl('', Validators.compose([
          Validators.required
        ])),
        usuario: new FormControl('', Validators.compose([
          Validators.required
        ]))
      });
    }

    if (this.cliente != null && this.cliente.usuario === this.validations_form.controls['usuario'].value) {
      this.usuarioValido = true;
    }
  }

  async cerrarModal() {
    await this.modalController.dismiss();
  }


  onSubmit(values) {
    let cliente: Cliente = Cliente.createFromJsonObject(values);
    if (this.cliente == null) {
      cliente.pedidos = new Array<Pedido>();
    }
    if (this.cliente == null) {
      this.apiService.registrarCliente(cliente)
        .then((respuesta: any) => {
          this.mostrarAlert("Cliente creado correctamente.");
        });
    } else {
      cliente.id = this.cliente.id;

      this.apiService.modificarCliente(cliente)
        .then((respuesta: any) => {
          this.mostrarAlert("Cliente modificado correctamente.");
        });
    }

  }

  compruebaUsuario(fcUsuario: string) {
    if (this.cliente != null && this.cliente.usuario === fcUsuario) {
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
