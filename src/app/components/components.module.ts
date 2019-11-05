import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShowErrorComponent } from './show-error/show-error.component';

@NgModule({
  declarations: [ShowErrorComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    ShowErrorComponent
  ]
})
export class ComponentsModule { }
