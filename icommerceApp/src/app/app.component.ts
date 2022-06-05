import { Component, Injectable } from '@angular/core';
import { StatusBar } from '@capacitor/status-bar';
import { MenuController, Platform } from '@ionic/angular';
import { Cliente } from './modelo/Cliente';
import { Empleado } from './modelo/Empleado';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public cliente:Cliente;
  public empleado:Empleado;
  
  constructor() {
    this.cliente=null;
    this.empleado=null;
  }

  setCliente(clienteIniciado:Cliente) {
    this.cliente=clienteIniciado;
    this.empleado=null;    
  }

  setEmpleado(empleadoIniciado:Empleado) {
    this.empleado=empleadoIniciado;
    this.cliente=null;
    
  }
  empleadosPage(){

  }
  clientesPage(){

  }
  menusPage(){

  }
  mesasPage(){

  }
  fichajesPage(){

  }
  pedidosPage(){

  }
  productosPage(){

  }
  cuentaPage(){

  }

}
