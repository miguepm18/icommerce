import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Cliente } from 'src/app/modelo/Cliente';
import { Empleado } from 'src/app/modelo/Empleado';
import { Mesa } from 'src/app/modelo/Mesa';
import { Pedido } from 'src/app/modelo/Pedido';
import { Producto } from 'src/app/modelo/Producto';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';

@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.page.html',
  styleUrls: ['./crear-pedido.page.scss'],
})
export class CrearPedidoPage implements OnInit {
  
  @Input() public pedido:Pedido;
  @Input() public empleado:Empleado;
  @Input() public mesa:Mesa;
  @Input() public cliente:Cliente;

  constructor(private modalController: ModalController, public formBuilder: FormBuilder, private apiService: ApiServiceProvider, private alertController: AlertController) { }

  ngOnInit() {
    console.log(this.pedido);
    console.log(this.empleado);
    console.log(this.mesa);
    console.log(this.cliente);
    
    
    
    
  }

}
