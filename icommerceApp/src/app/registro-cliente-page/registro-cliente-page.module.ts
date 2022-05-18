import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroClientePagePageRoutingModule } from './registro-cliente-page-routing.module';

import { RegistroClientePagePage } from './registro-cliente-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroClientePagePageRoutingModule
  ],
  declarations: [RegistroClientePagePage]
})
export class RegistroClientePagePageModule {}
