import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Menu } from 'src/app/modelo/Menu';
import { MenuProducto } from 'src/app/modelo/MenuProducto';
import { Producto } from 'src/app/modelo/Producto';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';

@Component({
  selector: 'app-crear-menu',
  templateUrl: './crear-menu.page.html',
  styleUrls: ['./crear-menu.page.scss'],
})
export class CrearMenuPage implements OnInit {

  validations_form: FormGroup;

  constructor(private modalController: ModalController, public formBuilder: FormBuilder, private apiService: ApiServiceProvider, private alertController: AlertController) { }

  @Input() public menu: Menu;

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
}
