import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpleadosPageRoutingModule } from './empleados-routing.module';

import { EmpleadosPage } from './empleados.page';
import { CrearEmpleadoPage } from '../modales/empleados/crear-empleado/crear-empleado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpleadosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EmpleadosPage],
  entryComponents: [CrearEmpleadoPage]
})
export class EmpleadosPageModule {}
