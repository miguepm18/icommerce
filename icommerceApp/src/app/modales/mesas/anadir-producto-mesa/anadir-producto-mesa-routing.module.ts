import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnadirProductoMesaPage } from './anadir-producto-mesa.page';

const routes: Routes = [
  {
    path: '',
    component: AnadirProductoMesaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnadirProductoMesaPageRoutingModule {}
