import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';
import { Cliente } from '../modelo/Cliente';

@Component({
  selector: 'app-registro-cliente-page',
  templateUrl: './registro-cliente-page.page.html',
  styleUrls: ['./registro-cliente-page.page.scss'],
})
export class RegistroClientePagePage implements OnInit {

  validations_form: FormGroup;
  nombreApellidos:boolean;
  usuario:boolean;
  passwords:boolean;
  direccionEmail:boolean;
  dniFechaNacimiento:boolean;
  allCorrect:boolean;
  usuarioValido:boolean;
  mensaje:string;

  constructor(public formBuilder: FormBuilder, private apiService: ApiServiceProvider) { }

  ngOnInit() {
    //BOLEANOS PARA CONTROLAR QUE CAMPO SE MUESTRA
    this.nombreApellidos = true;
    this.usuario = false;
    this.usuarioValido = null;
    this.passwords = false;
    this.direccionEmail = false;
    this.dniFechaNacimiento = false;
    this.allCorrect = false;

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
        Validators.required
      ])),
      fechaNacimiento: new FormControl('', Validators.compose([
        Validators.required
      ]))
      });


  }

  onSubmit(values){
    console.log(values);
    /*let navigationExtras: NavigationExtras = {
    queryParams: {
    user: JSON.stringify(values),
    numero: 3
    }
    };
    this.navCtrl.navigateForward('/user', navigationExtras);*/
  }

  //METODO QUE COMPRUEBA Y CAMBIA QUE CAMPOS SE MUESTRAN
  siguiente(fcUsuario:string){
    if(this.dniFechaNacimiento && (!this.usuario && !this.nombreApellidos && !this.nombreApellidos && !this.direccionEmail)){ //REQUISITOS PARA QUE PASE A LA PANTALLA DE INFORMACION GENERAL DEL FORMULARIO
      this.dniFechaNacimiento = false;
      this.allCorrect = true;
      this.mensaje = "Informacion general";
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
        console.log(this.usuarioValido);
        
           
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
}
