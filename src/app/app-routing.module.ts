import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { sesionNoIniciadaChildGuard } from './core/guards/sesion-no-iniciada.guard';
import { sesionIniciadaGuard } from './core/guards/sesion-iniciada.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./ui/pages/business/inicio/inicio.module').then(m => m.InicioModule)
  },
  {
    path: 'auth',
    canActivateChild: [sesionNoIniciadaChildGuard],
    loadChildren: () => import('./ui/pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'productos/:publicKey',
    loadComponent: () => import('./ui/pages/business/producto-detalle/producto-detalle.component').then(m => m.ProductoDetalleComponent)
  },
  {
    path: 'checkout',
    canActivate: [sesionIniciadaGuard],
    loadComponent: () => import('./ui/pages/business/checkout/checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: 'recibo/:publicKey',
    canActivate: [sesionIniciadaGuard],
    loadComponent: () => import('./ui/pages/business/recibo/recibo.component').then(m => m.ReciboComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
