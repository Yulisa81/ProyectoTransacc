import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FrmPersonaPrincipalPage } from './frm-persona-principal.page';

const routes: Routes = [
  {
    path: '',
    component: FrmPersonaPrincipalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FrmPersonaPrincipalPage]
})
export class FrmPersonaPrincipalPageModule {}
