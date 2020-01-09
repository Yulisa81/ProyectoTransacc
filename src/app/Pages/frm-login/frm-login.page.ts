import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CtrlInternetAccessService } from 'src/app/Services/ctrl-internet-access.service';
import { CtrlWebServiceService } from 'src/app/Services/ctrl-web-service.service';
import { MenuController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { EnumRequests } from '../../Shared/Enum/EnumRequest';
import { Comun } from '../../../Contol/Comun';
import { EnumNumericValue } from '../../Shared/Enum/EnumNumericValue';
import { Resource } from '../../../Contol/Resources/Resources';
import { EnumSegModulo } from '../../Shared/Enum/SegModulo';
import { Persona } from 'src/app/Shared/Entity/Persona';


@Component({
  selector: 'app-frm-login',
  templateUrl: './frm-login.page.html',
  styleUrls: ['./frm-login.page.scss'],
})
export class FrmLoginPage extends CtrlInternetAccessService implements OnInit {

  //#region Variables
  public myForm: FormGroup;
  public usuario = new Persona();
  public disabled = true;
  //#endregion

  //#region Constructor
  constructor(private router: Router, private formBuilder: FormBuilder,
              public menuCtrl: MenuController, private ctrlWebServiceService: CtrlWebServiceService,
              private comun: Comun) {
    super();
    this.myForm = this.validForm();
  }
  //#endregion

  ngOnInit() {
    this.menuCtrl.enable(false);
  }


  async login() {

    await this.comun.ctrGeneric.mostrarCargando();
    if (this.checkInternetConnection()) {
      console.log('TIENE CONEXION');
    } else {
      console.log('NO TIENE CONEXION');
    }

    this.ctrlWebServiceService.create(this.usuario, 'api/Login').then(res => {
      const respuesta = res.json();
      if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.Cero) {
        this.comun.globalVariable.usuario = respuesta[EnumRequests.Entity];
        this.comun.ctrGeneric.cerrarCargado();
        this.router.navigate([EnumSegModulo.Home]);
      } else if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.Uno) {
        this.comun.globalVariable.usuario = null;
        this.comun.ctrGeneric.cerrarCargado();
        this.comun.ctrGeneric.alertaInformativa(Resource.MES_DATOS_LOGIN_INCORRETOS);
      } else if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.MenosUno) {
        this.comun.globalVariable.usuario = null;
        this.comun.ctrGeneric.cerrarCargado();
        this.comun.ctrGeneric.alertaInformativa(Resource.MES_OCURRIO_ERROR_INESPERADO);
      }

    }).catch(e => this.comun.ctrGeneric.mostrarError(e));

  }

  //#region Validaciones
  private validForm() {
    return this.formBuilder.group({
      txtUsuario: ['', this.comun.ctrlValidate.OnlyLettersRequired()],
      txtPassword: ['', this.comun.ctrlValidate.OnlyNumersRequired()]
    });
  }
  //#endregion


}
