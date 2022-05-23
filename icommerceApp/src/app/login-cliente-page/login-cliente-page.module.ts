import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginClientePagePageRoutingModule } from './login-cliente-page-routing.module';

import { LoginClientePagePage } from './login-cliente-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginClientePagePageRoutingModule
  ],
  declarations: [LoginClientePagePage]
})
export class LoginClientePagePageModule {}
