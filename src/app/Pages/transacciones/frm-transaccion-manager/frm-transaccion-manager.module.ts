import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../../../components/components.module';

import { IonicModule } from '@ionic/angular';

import { FrmTransaccionManagerPage } from './frm-transaccion-manager.page';

const routes: Routes = [
  {
    path: '',
    component: FrmTransaccionManagerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FrmTransaccionManagerPage]
})
export class FrmTransaccionManagerPageModule {}
