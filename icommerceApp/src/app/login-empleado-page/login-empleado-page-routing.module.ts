import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginEmpleadoPagePage } from './login-empleado-page.page';

const routes: Routes = [
  {
    path: '',
    component: LoginEmpleadoPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginEmpleadoPagePageRoutingModule {}
