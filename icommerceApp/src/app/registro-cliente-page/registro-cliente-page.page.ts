import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';
import { Cliente } from '../modelo/Cliente';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro-cliente-page',
  templateUrl: './registro-cliente-page.page.html',
  styleUrls: ['./registro-cliente-page.page.scss'],
})
export class RegistroClientePagePage implements OnInit {
  [x: string]: any;

  validations_form: FormGroup;
  nombreApellidos:boolean;
  usuario:boolean;
  passwords:boolean;
  direccionEmail:boolean;
  dniFechaNacimiento:boolean;
  allCorrect:boolean;
  usuarioValido:boolean;
  contrasenaValida:boolean;
  mensaje:string;

  constructor(public formBuilder: FormBuilder, private apiService: ApiServiceProvider, private navCtrl: NavController, private alertCtrl: AlertController) { }

  ngOnInit() {
    //BOLEANOS PARA CONTROLAR QUE CAMPO SE MUESTRA
    this.nombreApellidos = true;
    this.usuario = false;
    this.usuarioValido = null;
    this.passwords = false;
    this.direccionEmail = false;
    this.dniFechaNacimiento = false;
    this.allCorrect = false;
    this.contrasenaValida = null;


    //MENSAJE DE INFORMACIÓN PARA EL USUARIO
    this.mensaje = "Introduzca su nombre y apellidos";

    //FORMULARIO
    this.validations_form = this.formBuilder.group({
      nombre: new FormControl('', Validators.compose([
      Validators.required
      ])),
      usuario: new FormControl('', Validators.compose([
        Validators.required
      ])),
      apellidos: new FormControl('', Validators.compose([
        Validators.required
      ])),
      contraseña: new FormControl('', Validators.compose([
        Validators.required
      ])),
      confirmaContraseña: new FormControl('', Validators.compose([
      Validators.required
      ])),
      direccion: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')
      ])),
      dni: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$')
      ])),
      fechaNacimiento: new FormControl('', Validators.compose([
        Validators.required
      ]))
      });

  }

  onSubmit(values){
    console.log(values);
    let nuevoCliente:Cliente = new Cliente(null, values['nombre'], values['apellidos'], values['usuario'], values['contraseña'], values['direccion'], values['email'], values['dni'], values['fechaNacimiento'], null, null);
    this.apiService.registrarCliente(nuevoCliente)
      .then( (respuesta:any)=> {          
          this.mostrarAlert();
      })
      .catch( (error:string) => {
          console.log(error);
      });
  }

  //METODO QUE COMPRUEBA Y CAMBIA QUE CAMPOS SE MUESTRAN
  siguiente(fcUsuario:string){
    if(this.dniFechaNacimiento && (!this.usuario && !this.nombreApellidos && !this.nombreApellidos && !this.direccionEmail)){ //REQUISITOS PARA QUE PASE A LA PANTALLA DE INFORMACION GENERAL DEL FORMULARIO
      this.allCorrect = true;
      this.dniFechaNacimiento = false;
      this.mensaje = "Informacion general";
      console.log(this.validations_form.controls['fechaNacimiento'].value);
      
    }
    if(this.direccionEmail && (!this.usuario && !this.nombreApellidos && !this.nombreApellidos && !this.dniFechaNacimiento)){//REQUISITOS PARA QUE PASE A LA PANTALLA DE DNI/FECHA DE NACIMIENTO
      this.direccionEmail = false;
      this.dniFechaNacimiento = true;
      this.mensaje = "Introduce tu DNI y Fecha de nacimiento";
      
    }
    if(this.passwords && (!this.usuario && !this.nombreApellidos && !this.direccionEmail && !this.dniFechaNacimiento)){//REQUISITOS PARA QUE PASE A LA PANTALLA DE DIRECCION/EMAIL
      this.passwords = false;
      this.direccionEmail = true;
      this.mensaje = "Introduce tu dirección y correo";
      
    }
    if(this.usuario && (!this.nombreApellidos && !this.passwords && !this.direccionEmail && !this.dniFechaNacimiento)){//REQUISITOS PARA QUE PASE A LA PANTALLA DE CONTRASEÑAS
        this.usuario = false;
        this.passwords = true;
        this.mensaje = "Introduce tu contraseña";
        this.usuarioValido=true;       
           
    }
    if(this.nombreApellidos && (!this.usuario && !this.passwords && !this.direccionEmail && !this.dniFechaNacimiento)){ //REQUISITOS PARA QUE PASE A LA PANTALLA DE USUARIO
      this.usuario = true;
      this.nombreApellidos = false;
      this.mensaje = "Introduce tu nombre de usuario";
    }
  }

  compruebaUsuario(fcUsuario:string){     
    let enc:boolean = false;
    this.apiService.compruebaUsuarioCliente(fcUsuario)
      .then( (respuesta:boolean)=> {          
          this.usuarioValido=!respuesta;          
      })
      .catch( (error:string) => {
          console.log(error);
      });
    return enc;
  }
  compruebaContrasena(pass:string, confirmPass:string){
    if(pass.toLocaleLowerCase()===confirmPass.toLowerCase()){
      this.contrasenaValida=true;
    }else{
      this.contrasenaValida=false;
    }
  }
  reiniciaPage(){
    this.navCtrl.navigateRoot('/home', { animated: true, animationDirection: 'forward' });
  }
  async mostrarAlert(){
    this.alertCtrl.create({
      header: 'Información', 
      message:'Usuario creado correctamente',
      buttons:[
        {
          text: 'Aceptar',
          id: 'confirm-button',
          handler: () => {
            this.reiniciaPage();
          }
        }
      ]
    }).then(alertEt =>{
     alertEt.present();
    })
  }
}
