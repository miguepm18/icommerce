import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VistaMesaPage } from './vista-mesa.page';

const routes: Routes = [
  {
    path: '',
    component: VistaMesaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaMesaPageRoutingModule {}
