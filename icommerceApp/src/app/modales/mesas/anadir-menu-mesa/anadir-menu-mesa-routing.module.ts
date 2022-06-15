import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnadirMenuMesaPage } from './anadir-menu-mesa.page';

const routes: Routes = [
  {
    path: '',
    component: AnadirMenuMesaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnadirMenuMesaPageRoutingModule {}
