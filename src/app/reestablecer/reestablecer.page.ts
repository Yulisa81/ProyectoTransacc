import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { resolve } from 'url';
import { Comun } from 'src/Contol/Comun';
import { EnumSegModulo } from '../Shared/Enum/SegModulo';

@Component({
  selector: 'app-reestablecer',
  templateUrl: './reestablecer.page.html',
  styleUrls: ['./reestablecer.page.scss'],
})

export class ReestablecerPage implements OnInit {


  objetoReset: ObjetoReset;
  formResetAccount: FormGroup;

  constructor(private fb: FormBuilder, public menuCtrl: MenuController, private router: Router) {
    this.formResetAccount = this.fb.group({
      txtCorreoAsociado: ['', [Validators.required, Validators.maxLength(50), Validators.email]],
      txtPassword: ['', [Validators.required, Validators.maxLength(50)]],
      txtPasswordCfrm: ['', [Validators.required, Validators.maxLength(50)]],
    }, {
      validator: checkMatchValidator('txtPassword', 'txtPasswordCfrm')
    });
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  resetAccount(postObj: any) {
    this.objetoReset.strCorreo = postObj.txtCorreoAsociado;
    this.objetoReset.strPassword = postObj.strPassword;
    this.objetoReset.strPasswordCfrm = postObj.strPasswordCfrm;
    console.log(this.objetoReset);
    // TODO Call to web service
  }

}

export class ObjetoReset {
  strCorreo: string;
  strPassword: string;
  strPasswordCfrm: string;
}

export function checkMatchValidator(f1: string, f2: string) {
  return (frm) => {
    const f1Val = frm.get(f1).value;
    const f2Val = frm.get(f2).value;
    if (f1Val !== '' && f1Val !== f2Val) {
      return { notMatch: 'Las contraseñas no coinciden' };
    }
    return null;
  };
}
