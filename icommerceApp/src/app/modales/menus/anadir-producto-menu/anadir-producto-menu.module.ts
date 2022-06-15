import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnadirProductoMenuPageRoutingModule } from './anadir-producto-menu-routing.module';

import { AnadirProductoMenuPage } from './anadir-producto-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnadirProductoMenuPageRoutingModule
  ],
  declarations: [AnadirProductoMenuPage]
})
export class AnadirProductoMenuPageModule {}
