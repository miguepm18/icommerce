import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnadirProductoMesaPageRoutingModule } from './anadir-producto-mesa-routing.module';

import { AnadirProductoMesaPage } from './anadir-producto-mesa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnadirProductoMesaPageRoutingModule
  ],
  declarations: [AnadirProductoMesaPage]
})
export class AnadirProductoMesaPageModule {}
