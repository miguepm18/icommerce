import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearFichajePage } from './crear-fichaje.page';

const routes: Routes = [
  {
    path: '',
    component: CrearFichajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearFichajePageRoutingModule {}
