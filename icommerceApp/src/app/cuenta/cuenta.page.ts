import { Component, OnInit } from '@angular/core';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';
import { AppComponent } from '../app.component';
import { Cliente } from '../modelo/Cliente';
import { Empleado } from '../modelo/Empleado';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  empleadoActual:Empleado;
  clienteActual:Cliente;

  constructor(private apiProvider: ApiServiceProvider, private appComponent:AppComponent) { 
    if(this.appComponent.cliente!=null){
      this.clienteActual = this.appComponent.cliente;
      this.empleadoActual=null;
    }else{
      this.empleadoActual=this.appComponent.empleado;
      this.clienteActual=null;
    }
  }

  ngOnInit() {
  }

}
