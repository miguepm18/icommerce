import { Component, Injectable } from '@angular/core';
import { StatusBar } from '@capacitor/status-bar';
import { MenuController, NavController, Platform } from '@ionic/angular';
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
  
  constructor(private navController:NavController, private menu:MenuController) {
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
    this.navController.navigateForward("/empleados");
    this.menu.close('empleado');
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
