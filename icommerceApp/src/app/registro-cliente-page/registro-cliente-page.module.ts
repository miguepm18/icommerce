import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroClientePagePageRoutingModule } from './registro-cliente-page-routing.module';

import { RegistroClientePagePage } from './registro-cliente-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroClientePagePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistroClientePagePage]
})
export class RegistroClientePagePageModule {}
