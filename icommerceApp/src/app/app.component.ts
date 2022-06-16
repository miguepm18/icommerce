import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@capacitor/status-bar';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { Cliente } from './modelo/Cliente';
import { Empleado } from './modelo/Empleado';
import * as moment from 'moment';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public cliente:Cliente;
  public empleado:Empleado;
  
  constructor(private navController:NavController, private menu:MenuController, private router:Router) {
    this.cliente=null;
    this.empleado=null;
    moment.locale('es');
  }

  setCliente(clienteIniciado:Cliente) {
    this.cliente=clienteIniciado;
    this.empleado=null;
  }

  logOut(){
    this.cliente=null;
    this.empleado=null;
    this.navController.navigateRoot('/login-empleado-page', { animated: true, animationDirection: 'back' });
  }
  setEmpleado(empleadoIniciado:Empleado) {
    this.empleado=empleadoIniciado;
    this.cliente=null;
    
  }

  homePage(){
    if(this.empleado==null && this.cliente!=null){
      this.navController.navigateRoot("/home-cliente/" + this.cliente.id);
    }else{
      this.navController.navigateRoot("/home-empleado/" + this.empleado.id);
    }
    this.menu.close('empleado');
  }

  empleadosPage(){
    this.navController.navigateForward("/empleados");
    this.menu.close('empleado');
  }
  clientesPage(){
    this.navController.navigateForward("/clientes");
    this.menu.close('empleado');
  }
  menusPage(){
    this.navController.navigateForward("/menus");
    this.menu.close('empleado');
  }
  mesasPage(){
    this.navController.navigateForward("/mesas");
    this.menu.close('empleado');
  }
  fichajesPage(){
    this.navController.navigateForward("/fichajes");
    this.menu.close('empleado');
  }
  pedidosPage(){
    this.navController.navigateForward("/pedidos");
    this.menu.close('empleado');
  }
  productosPage(){
    this.navController.navigateForward("/productos");
    this.menu.close('empleado');
  }
  cuentaPage(){
    this.navController.navigateForward("/cuenta");
    this.menu.close('empleado');
  }
  cestaPage(){
    this.navController.navigateForward("/cesta");
    this.menu.close('empleado');
  }
}
