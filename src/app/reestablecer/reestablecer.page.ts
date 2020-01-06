import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reestablecer',
  templateUrl: './reestablecer.page.html',
  styleUrls: ['./reestablecer.page.scss'],
})

export class ReestablecerPage implements OnInit {


  objetoReset: ObjetoReset;
  formResetAccount: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formResetAccount = this.fb.group({
      txtCorreoAsociado: ['', [Validators.required, Validators.maxLength(50), Validators.email]],
      txtPassword: ['', [Validators.required, Validators.maxLength(50)]],
      txtPasswordCfrm: ['', [Validators.required, Validators.maxLength(50)]],
    });
   }

  ngOnInit() {
  }

  resetAccount(postObj: any) {
    this.objetoReset = new ObjetoReset();
    this.objetoReset.strCorreo = postObj.txtCorreoAsociado;
    this.objetoReset.strPassword = postObj.strPassword;
    this.objetoReset.strPasswordCfrm = postObj.strPasswordCfrm;
    console.log(this.objetoReset);
    // Call to web service
  }
}

export class ObjetoReset {
  strCorreo: string;
  strPassword: string;
  strPasswordCfrm: string;
  }
