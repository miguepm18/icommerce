import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FichajesPageRoutingModule } from './fichajes-routing.module';

import { FichajesPage } from './fichajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FichajesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FichajesPage]
})
export class FichajesPageModule {}
