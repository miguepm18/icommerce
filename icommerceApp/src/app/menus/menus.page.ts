import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';
import { CrearMenuPage } from '../modales/menus/crear-menu/crear-menu.page';
import { Menu } from '../modelo/Menu';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.page.html',
  styleUrls: ['./menus.page.scss'],
})
export class MenusPage implements OnInit {

  menus: Array<Menu>;
  activos:boolean;
  constructor(private apiProvider: ApiServiceProvider, private modalController: ModalController) {
    this.menus = new Array<Menu>();
    this.activos=false;
   }

  ngOnInit() {
  }

  mostrarActivos(){
    this.activos=!this.activos;
  }

  ionViewWillEnter() {
    this.apiProvider.getMenus()
      .then((respuesta: any) => {    
        console.log(respuesta);
        this.menus= new Array<Menu>();
        respuesta.forEach(menuJson => {
          
          let menu:Menu =  Menu.createFromJsonObject(menuJson);
     
          
          this.menus.push(menu);
        });
      });
    
  }

  async anadirMenu(menuSelec: Menu) {
    const modal = await this.modalController.create({
      component: CrearMenuPage,
      componentProps: {
        'menu': menuSelec
      }
    });

    modal.onWillDismiss().then(dataReturned => {
      this.apiProvider.getMenus()
      .then((respuesta: any) => {
        this.menus= new Array<Menu>();
        respuesta.forEach(menuJson => {
          let menu = Menu.createFromJsonObject(menuJson);
          this.menus.push(menu);
        });
      });
    });

    return await modal.present();
  }

  deleteMenu(menuSelec: Menu) {
    this.apiProvider.deleteMenu(menuSelec)
      .then((respuesta: any) => {
        this.apiProvider.getMenus()
        .then((respuesta: any) => {
          this.menus= new Array<Menu>();
          respuesta.forEach(menuJson => {
            let menu = Menu.createFromJsonObject(menuJson);
            this.menus.push(menu);
          });
        });
      });

  }
}
