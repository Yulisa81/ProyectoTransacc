import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FrmCuentasPrincipalPage } from './frm-cuentas-principal.page';

const routes: Routes = [
  {
    path: '',
    component: FrmCuentasPrincipalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FrmCuentasPrincipalPage]
})
export class FrmCuentasPrincipalPageModule {}
