import { Component, OnInit } from '@angular/core';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';
import { AppComponent } from '../app.component';
import { Cliente } from '../modelo/Cliente';
import { Empleado } from '../modelo/Empleado';
import { Pedido } from '../modelo/Pedido';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.page.html',
  styleUrls: ['./cesta.page.scss'],
})
export class CestaPage implements OnInit {
  clienteActual: Cliente;
  empleadoActual: Empleado;
  pedidosCliente:Array<Pedido> = new Array<Pedido>();;

  constructor(private apiProvider: ApiServiceProvider, private appComponent: AppComponent) {
    if (this.appComponent.cliente != null) {
      this.clienteActual = appComponent.cliente;
    } else {
      this.empleadoActual = appComponent.empleado;
    }
    
  }

  ngOnInit() {
    
      console.log(this.pedidosCliente);
      
  }
  
  ionViewWillEnter(){
    this.pedidosCliente = new Array<Pedido>();
    this.apiProvider.getPedidosDelCliente(this.clienteActual)
      .then((respuesta: any) => {
        respuesta.forEach(pedidoJson => {

          let pedido: Pedido = Pedido.createFromJsonObject(pedidoJson);
          if(pedido.activo){
            this.pedidosCliente.push(pedido);
          }
        });
      }); 
  }
  tramitarPedido(){
    this.pedidosCliente[this.pedidosCliente.length-1].estado="pendienteDeEntrega";
    this.apiProvider.modificarPedido(this.pedidosCliente[this.pedidosCliente.length-1])
      .then((respuesta: any) => {
        console.log(respuesta);
      }); 
  }


}
