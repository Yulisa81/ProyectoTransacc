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
  { path: 'frm-persona', loadChildren: './Pages/frm-persona/frm-persona.module#FrmPersonaPageModule' },
  { path: 'frm-transacciones', loadChildren: './Pages/transacciones/frm-transacciones/frm-transacciones.module#FrmTransaccionesPageModule' },
  { path: 'frm-about', loadChildren: './Pages/frm-about/frm-about.module#FrmAboutPageModule' },
  { path: 'frm-persona-principal', loadChildren: './Pages/frm-persona-principal/frm-persona-principal.module#FrmPersonaPrincipalPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
