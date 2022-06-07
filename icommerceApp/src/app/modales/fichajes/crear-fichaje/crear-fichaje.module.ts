import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearFichajePageRoutingModule } from './crear-fichaje-routing.module';

import { CrearFichajePage } from './crear-fichaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearFichajePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CrearFichajePage]
})
export class CrearFichajePageModule {}
