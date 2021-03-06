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
  {
    path: 'crear-cliente',
    loadChildren: () => import('./modales/clientes/crear-cliente/crear-cliente.module').then( m => m.CrearClientePageModule)
  },
  {
    path: 'crear-menu',
    loadChildren: () => import('./modales/menus/crear-menu/crear-menu.module').then( m => m.CrearMenuPageModule)
  },
  {
    path: 'crear-mesa',
    loadChildren: () => import('./modales/mesas/crear-mesa/crear-mesa.module').then( m => m.CrearMesaPageModule)
  },
  {
    path: 'crear-fichaje',
    loadChildren: () => import('./modales/fichajes/crear-fichaje/crear-fichaje.module').then( m => m.CrearFichajePageModule)
  },
  {
    path: 'crear-producto',
    loadChildren: () => import('./modales/productos/crear-producto/crear-producto.module').then( m => m.CrearProductoPageModule)
  },
  {
    path: 'crear-pedido',
    loadChildren: () => import('./modales/pedidos/crear-pedido/crear-pedido.module').then( m => m.CrearPedidoPageModule)
  },
  {
    path: 'vista-mesa',
    loadChildren: () => import('./modales/mesas/vista-mesa/vista-mesa.module').then( m => m.VistaMesaPageModule)
  },
  {
    path: 'anadir-producto-menu',
    loadChildren: () => import('./modales/menus/anadir-producto-menu/anadir-producto-menu.module').then( m => m.AnadirProductoMenuPageModule)
  },
  {
    path: 'anadir-producto-mesa',
    loadChildren: () => import('./modales/mesas/anadir-producto-mesa/anadir-producto-mesa.module').then( m => m.AnadirProductoMesaPageModule)
  },
  {
    path: 'anadir-menu-mesa',
    loadChildren: () => import('./modales/mesas/anadir-menu-mesa/anadir-menu-mesa.module').then( m => m.AnadirMenuMesaPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
