import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnadirProductoMenuPage } from './anadir-producto-menu.page';

const routes: Routes = [
  {
    path: '',
    component: AnadirProductoMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnadirProductoMenuPageRoutingModule {}
