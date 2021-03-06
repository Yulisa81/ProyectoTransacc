import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../../components/components.module';
import { FrmTransaccionesPage } from './frm-transacciones.page';

const routes: Routes = [
  {
    path: '',
    component: FrmTransaccionesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FrmTransaccionesPage]
})
export class FrmTransaccionesPageModule {}
