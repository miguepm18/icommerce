import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaMesaPageRoutingModule } from './vista-mesa-routing.module';

import { VistaMesaPage } from './vista-mesa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaMesaPageRoutingModule
  ],
  declarations: [VistaMesaPage]
})
export class VistaMesaPageModule {}
