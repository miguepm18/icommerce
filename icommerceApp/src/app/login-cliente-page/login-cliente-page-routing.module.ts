import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginClientePagePage } from './login-cliente-page.page';

const routes: Routes = [
  {
    path: '',
    component: LoginClientePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginClientePagePageRoutingModule {}
