import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginEmpleadoPagePageRoutingModule } from './login-empleado-page-routing.module';

import { LoginEmpleadoPagePage } from './login-empleado-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginEmpleadoPagePageRoutingModule
  ],
  declarations: [LoginEmpleadoPagePage]
})
export class LoginEmpleadoPagePageModule {}
