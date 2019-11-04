import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'frm-login', loadChildren: './Pages/frm-login/frm-login.module#FrmLoginPageModule' },
    { path: 'frm-persona', loadChildren: './Pages/frm-persona/frm-persona.module#FrmPersonaPageModule' },
  { path: 'frm-transacciones', loadChildren: './Pages/frm-transacciones/frm-transacciones.module#FrmTransaccionesPageModule' },
  { path: 'frm-about', loadChildren: './Pages/frm-about/frm-about.module#FrmAboutPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
