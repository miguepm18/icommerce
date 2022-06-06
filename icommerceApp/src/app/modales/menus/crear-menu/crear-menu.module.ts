import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearMenuPageRoutingModule } from './crear-menu-routing.module';

import { CrearMenuPage } from './crear-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearMenuPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CrearMenuPage]
})
export class CrearMenuPageModule {}
