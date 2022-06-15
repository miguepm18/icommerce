import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Menu } from 'src/app/modelo/Menu';
import { MenuProducto } from 'src/app/modelo/MenuProducto';
import { Producto } from 'src/app/modelo/Producto';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';
import { AnadirProductoMenuPage } from '../anadir-producto-menu/anadir-producto-menu.page';

@Component({
  selector: 'app-crear-menu',
  templateUrl: './crear-menu.page.html',
  styleUrls: ['./crear-menu.page.scss'],
})
export class CrearMenuPage implements OnInit {

  validations_form: FormGroup;
  @Input() public menu: Menu;
  public productosAsociadosEditados:Array<Producto>;
  constructor(private modalController: ModalController, public formBuilder: FormBuilder, private apiService: ApiServiceProvider, private alertController: AlertController) {
    
    
   }

  

  ngOnInit() {
    if(this.menu!=null){
      this.validations_form = this.formBuilder.group({
        activo: new FormControl(this.menu.activo, Validators.compose([
          Validators.required
        ])),
        nombre: new FormControl(this.menu.nombre, Validators.compose([
          Validators.required
        ])),
        observaciones: new FormControl(this.menu.observaciones, Validators.compose([
          Validators.required
        ]))
      });
    }else{
      this.validations_form = this.formBuilder.group({
        activo: new FormControl(false, Validators.compose([
          Validators.required
        ])),
        nombre: new FormControl('', Validators.compose([
          Validators.required
        ])),
        observaciones: new FormControl('', Validators.compose([
          Validators.required
        ]))
      });
    }
    
  }

  async cerrarModal() {
    await this.modalController.dismiss();
  }

  onSubmit(values) {
    let menu: Menu = Menu.createFromJsonObject(values);
    if (this.menu == null) {
      menu.productos = new Array<MenuProducto>();
    }
    if (this.menu == null) {
      this.apiService.registrarMenu(menu)
        .then((respuesta: any) => {
          this.mostrarAlert("Menu creado correctamente.");
        });
    } else {
      menu.id = this.menu.id;
      menu.productos = this.menu.productos;
      menu.precioTotal=0;
      menu.productos.forEach(menuProducto => {
        menu.precioTotal+=menuProducto.producto.precio*menuProducto.cantidad;
      });
      this.apiService.modificarMenu(menu)
        .then((respuesta: any) => {
          this.mostrarAlert("Menu modificado correctamente.");
        });
    }

  }

  async mostrarAlert(texto: string) {
    this.alertController.create({
      header: 'Información',
      message: texto,
      buttons: [
        {
          text: 'Aceptar',
          id: 'confirm-button',
          handler: () => {
            this.cerrarModal();
          }
        }
      ]
    }).then(alertEt => {
      alertEt.present();
    })
  }

  async anadirProducto() {
    let productos:Array<Producto> = new Array<Producto>();
    this.apiService.getProductos()
      .then((respuesta: any) => {    
        respuesta.forEach(productoJson => {
          
          let producto:Producto =  Producto.createFromJsonObject(productoJson);
     
          if(producto.activo){
            productos.push(producto);
          }
          
        });
      });
      
      
    const modal = await this.modalController.create({
      component: AnadirProductoMenuPage,
      componentProps: {
        'productosActivos': productos,
        'productoMenu': this.menu.productos,
        'idMenu': this.menu.id
      }
    });

    modal.onWillDismiss().then(dataReturned => {
      console.log(dataReturned);
      
    });

    return await modal.present();
  }
}
