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
  
  
  @Input() mesa: Mesa;
  @Input() empleados:Array<Empleado>;
  

  constructor(private modalController: ModalController, public formBuilder: FormBuilder, private apiService: ApiServiceProvider, private alertController: AlertController) {      
    
  }

  ngOnInit() {
    console.log(this.empleados);
    
    if (this.mesa != null) {
      if (this.mesa.empleado != null) {
        this.validations_form = this.formBuilder.group({
          activo: new FormControl(this.mesa.activo, Validators.compose([
            Validators.required
          ])),
          capacidad: new FormControl(this.mesa.capacidad, Validators.compose([
            Validators.required
          ])),
          empleadoMesa: new FormControl(this.mesa.empleado.id, Validators.compose([
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
          empleadoMesa: new FormControl('', Validators.compose([
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
        empleadoMesa: new FormControl('', Validators.compose([
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
    let emp: Empleado = new Empleado(null, null, null, null, null, null, null, null, null, null, null, null);
    console.log(values['empleadoMesa']);
    
    this.empleados.forEach(empleado => {
      if (empleado.id === values['empleadoMesa']) {
        emp = empleado;
      }
    });
    
    mesa.empleado = emp;
    if (this.mesa == null) {
      mesa.pedidos = new Array<Pedido>();
    }
    if (this.mesa == null && values['empleadoMesa'] === "noAsignado") {
      delete this.mesa.empleado
    }
    if (this.mesa == null) {
      mesa.cuenta=0;
      mesa.ocupada=false;
      this.apiService.registrarMesa(mesa)
        .then((respuesta: any) => {
          this.mostrarAlert("Mesa creada correctamente.");
        });
    } else {
      mesa.id = this.mesa.id;
      mesa.ocupada=this.mesa.ocupada;
      if(this.mesa.cuenta!=null){
        mesa.cuenta=this.mesa.cuenta;
      }
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
