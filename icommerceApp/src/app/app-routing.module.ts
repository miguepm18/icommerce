import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'registro-cliente-page',
    loadChildren: () => import('./registro-cliente-page/registro-cliente-page.module').then( m => m.RegistroClientePagePageModule)
  },
  {
    path: 'login-empleado-page',
    loadChildren: () => import('./login-empleado-page/login-empleado-page.module').then( m => m.LoginEmpleadoPagePageModule)
  },
  {
    path: 'home-cliente/:id',
    loadChildren: () => import('./home-cliente/home-cliente.module').then( m => m.HomeClientePageModule)
  },
  {
    path: 'home-empleado/:id',
    loadChildren: () => import('./home-empleado/home-empleado.module').then( m => m.HomeEmpleadoPageModule)
  },  {
    path: 'empleados',
    loadChildren: () => import('./empleados/empleados.module').then( m => m.EmpleadosPageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'menus',
    loadChildren: () => import('./menus/menus.module').then( m => m.MenusPageModule)
  },
  {
    path: 'mesas',
    loadChildren: () => import('./mesas/mesas.module').then( m => m.MesasPageModule)
  },
  {
    path: 'fichajes',
    loadChildren: () => import('./fichajes/fichajes.module').then( m => m.FichajesPageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./cuenta/cuenta.module').then( m => m.CuentaPageModule)
  },
  {
    path: 'cesta',
    loadChildren: () => import('./cesta/cesta.module').then( m => m.CestaPageModule)
  },
  {
    path: 'crear-empleado',
    loadChildren: () => import('./modales/empleados/crear-empleado/crear-empleado.module').then( m => m.CrearEmpleadoPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
