import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';
import { Cliente } from '../modelo/Cliente';
import { Empleado } from '../modelo/Empleado';

@Component({
  selector: 'app-login-empleado-page',
  templateUrl: './login-empleado-page.page.html',
  styleUrls: ['./login-empleado-page.page.scss'],
})
export class LoginEmpleadoPagePage implements OnInit {

  validations_form: FormGroup;
  credencialesIncorrectos:boolean;
  constructor(public formBuilder: FormBuilder, private apiService: ApiServiceProvider, private alertCtrl: AlertController, private navCtrl: NavController) { }

  ngOnInit() {

    this.credencialesIncorrectos=false;

    this.validations_form = this.formBuilder.group({
      usuario: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ]))
      });

  }
  onSubmit(values){
    console.log(values);
    let cliente:Cliente = new Cliente(null, null, null, values['usuario'], values['password'], null, null, null, null, null, null);
    this.apiService.logInCliente(cliente)
      .then( (respuesta:any)=> {          
          if(!respuesta){
            console.log("Buscando en empleados...");
            let empleado:Empleado = new Empleado(null, null, null, values['usuario'], values['password'], null, null, null, null, null, null, null);
            this.apiService.logInEmpleado(empleado)
            .then((respuesta:any)=>{
              if(!respuesta){
                this.mostrarAlert();
              }else{
                console.log("Navegando a homeEmpleado");
                this.navCtrl.navigateForward('/home-empleado');
              }
            })
            .catch( (error:string) => {
              console.log(error);
            });            
          }else{
            console.log("Navegando a homeCliente");
            this.navCtrl.navigateForward('/home-cliente');
          }
          
      })
      .catch( (error:string) => {
          console.log(error);
      });
    
  }

  async mostrarAlert(){
    this.alertCtrl.create({
      header: 'Información', 
      message:'Usuario o contraseña incorrectos',
      buttons:[
        {
          text: 'Aceptar',
          id: 'confirm-button'
        }
      ]
    }).then(alertEt =>{
     alertEt.present();
    })
  }

}
