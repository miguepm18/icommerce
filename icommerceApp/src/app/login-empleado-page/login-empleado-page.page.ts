import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';
import { Cliente } from '../modelo/Cliente';

@Component({
  selector: 'app-login-empleado-page',
  templateUrl: './login-empleado-page.page.html',
  styleUrls: ['./login-empleado-page.page.scss'],
})
export class LoginEmpleadoPagePage implements OnInit {

  validations_form: FormGroup;
  credencialesIncorrectos:boolean;
  constructor(public formBuilder: FormBuilder, private apiService: ApiServiceProvider) { }

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
    this.apiService.logInCliente(values['usuario'], values['password'])
      .then( (respuesta:any)=> {          
          if(!respuesta){
            this.apiService.getEmpleados()
            .then((respuesta:any)=>{ 

            }).catch( (error:string) => {
              console.log(error);
          });
            
          }else{
            console.log(respuesta);
            
          }
          
      })
      .catch( (error:string) => {
          console.log(error);
      });
    
  }

}
