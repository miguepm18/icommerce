import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroClientePagePage } from './registro-cliente-page.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroClientePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroClientePagePageRoutingModule {}
