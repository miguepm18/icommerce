import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-cliente-page',
  templateUrl: './registro-cliente-page.page.html',
  styleUrls: ['./registro-cliente-page.page.scss'],
})
export class RegistroClientePagePage implements OnInit {

  validations_form: FormGroup;
  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      nombre: new FormControl('', Validators.compose([
      Validators.pattern('^[a-zA-Z0-9]+$'),
      Validators.required
      ])),
      usuario: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      contraseña: new FormControl('', Validators.required),
      confirmaContraseña: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+[@]{1}[a-zA-Z0-9-]+[.]{1}[a-zA-Z]+$')
      ])),
      direccion: new FormControl('', Validators.required),
      email: new FormControl('', Validators.pattern('true')),
      dni: new FormControl('', Validators.required),
      fechaNacimiento: new FormControl('', Validators.required)
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

}
