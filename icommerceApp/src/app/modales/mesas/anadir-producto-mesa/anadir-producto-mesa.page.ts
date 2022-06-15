import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Mesa } from 'src/app/modelo/Mesa';
import { Pedido } from 'src/app/modelo/Pedido';
import { PedidoProducto} from 'src/app/modelo/PedidoProducto';
import { Producto } from 'src/app/modelo/Producto';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';

@Component({
  selector: 'app-anadir-producto-mesa',
  templateUrl: './anadir-producto-mesa.page.html',
  styleUrls: ['./anadir-producto-mesa.page.scss'],
})
export class AnadirProductoMesaPage implements OnInit {

  public productosDisponibles:Array<Producto>;
  @Input() productosPedido:Array<PedidoProducto>;
  @Input() pedido:Pedido;
  @Input() mesa:Mesa;
  constructor( private modalController: ModalController, private apiService: ApiServiceProvider, private alertController: AlertController) { }

  ngOnInit() {
    if(this.productosPedido==null){
      this.productosPedido = new Array<PedidoProducto>();
    }

    this.apiService.getProductos()
      .then((respuesta: any) => {    
        this.productosDisponibles= new Array<Producto>();
        respuesta.forEach(productoJson => {
          
          let producto:Producto =  Producto.createFromJsonObject(productoJson);
     
          if(producto.activo){
            this.productosDisponibles.push(producto);
          }
          
        });

        if(this.productosPedido.length>0){
          this.productosPedido.forEach(productoPedido => {       
            this.productosDisponibles.forEach(producto => {
              if(producto.id==productoPedido.producto.id){
                this.productosDisponibles.splice(this.productosDisponibles.indexOf(producto), 1);
              }
            });
          });
        }
      });;
  
    
    
  }

  async cerrarModal() {
    this.mesa.cuenta = this.pedido.precio;
    await this.modalController.dismiss();    
  }

  anadirProducto(producto:Producto){
    let pedidoProducto:PedidoProducto = new PedidoProducto(null, this.pedido.id, 1, producto);
    this.productosDisponibles.splice(this.productosDisponibles.indexOf(producto), 1);
    this.productosPedido.push(pedidoProducto);
    this.pedido.precio+=producto.precio;
  }

  eliminarProducto(pedidoProducto:PedidoProducto){
    this.productosDisponibles.push(pedidoProducto.producto);
    this.productosPedido.splice(this.productosPedido.indexOf(pedidoProducto), 1);
    this.pedido.precio-=pedidoProducto.producto.precio*pedidoProducto.cantidad;
  }

  aumentaCantidad(pedidoProducto:PedidoProducto){
    this.productosPedido[this.productosPedido.indexOf(pedidoProducto)].cantidad++;
    this.pedido.precio+=pedidoProducto.producto.precio;
  }
  disminuyeCantidad(pedidoProducto:PedidoProducto){
    this.productosPedido[this.productosPedido.indexOf(pedidoProducto)].cantidad--;
    this.pedido.precio-=pedidoProducto.producto.precio;
  }

}
