import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'frm-login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  { path: 'frm-login', loadChildren: './Pages/frm-login/frm-login.module#FrmLoginPageModule' },
  { path: 'frm-persona', loadChildren: './Pages/persona/frm-persona/frm-persona.module#FrmPersonaPageModule' },
  { path: 'frm-transacciones', loadChildren: './Pages/transacciones/frm-transacciones/frm-transacciones.module#FrmTransaccionesPageModule' },
  { path: 'frm-about', loadChildren: './Pages/frm-about/frm-about.module#FrmAboutPageModule' },
  { path: 'frm-persona-principal', loadChildren: './Pages/persona/frm-persona-principal/frm-persona-principal.module#FrmPersonaPrincipalPageModule' },
  { path: 'frm-cuentas-principal', loadChildren: './Pages/persona/cuenta/frm-cuentas-principal/frm-cuentas-principal.module#FrmCuentasPrincipalPageModule' },
  { path: 'frm-cuenta', loadChildren: './Pages/persona/cuenta/frm-cuenta/frm-cuenta.module#FrmCuentaPageModule' },
  { path: 'reestablecer', loadChildren: './reestablecer/reestablecer.module#ReestablecerPageModule' },
  { path: 'frm-transaccion-manager', loadChildren: './Pages/transacciones/frm-transaccion-manager/frm-transaccion-manager.module#FrmTransaccionManagerPageModule' }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
