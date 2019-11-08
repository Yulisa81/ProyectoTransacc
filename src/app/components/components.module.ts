import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShowErrorComponent } from './show-error/show-error.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [ShowErrorComponent, HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    ShowErrorComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }
