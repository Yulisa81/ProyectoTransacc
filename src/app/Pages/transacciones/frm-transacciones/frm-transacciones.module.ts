import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FrmTransaccionesPage } from './frm-transacciones.page';
import { FrmTransaccionesManagerComponent } from '../frm-transacciones-manager/frm-transacciones-manager.component';

const routes: Routes = [
  {
    path: '',
    component: FrmTransaccionesPage
  },
  {
    path: '/Manager',
    component: FrmTransaccionesManagerComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FrmTransaccionesPage, FrmTransaccionesManagerComponent]
})
export class FrmTransaccionesPageModule {}
