import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearMenuPage } from './crear-menu.page';

const routes: Routes = [
  {
    path: '',
    component: CrearMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearMenuPageRoutingModule {}
