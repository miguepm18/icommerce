import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnadirMenuMesaPageRoutingModule } from './anadir-menu-mesa-routing.module';

import { AnadirMenuMesaPage } from './anadir-menu-mesa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnadirMenuMesaPageRoutingModule
  ],
  declarations: [AnadirMenuMesaPage]
})
export class AnadirMenuMesaPageModule {}
