import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cuenta } from '../../../../Shared/Entity/Cuenta';
import { IFormManager } from '../../../../Interfaces/IFormManager';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CtrlWebServiceService } from '../../../../Services/ctrl-web-service.service';
import { FormManagerExtender } from '../../../../Shared/Extender/FormManagerExtender';
import { Comun } from '../../../../../Contol/Comun';
import { isNullOrUndefined } from 'util';
import { EnumRequests } from '../../../../Shared/Enum/EnumRequest';
import { EnumNumericValue } from '../../../../Shared/Enum/EnumNumericValue';
import { Resource } from '../../../../../Contol/Resources/Resources';
import { EnumSegModulo } from '../../../../Shared/Enum/SegModulo';
import { Storage } from '@ionic/storage';
import { ComCatEstadoCuenta } from '../../../../Shared/Entity/ComCatEstadoCuenta';
import { SegUsuario } from '../../../../Shared/Entity/SegUsuario';

@Component({
  selector: 'app-frm-cuenta',
  templateUrl: './frm-cuenta.page.html',
  styleUrls: ['./frm-cuenta.page.scss'],
})
export class FrmCuentaPage implements OnInit, OnDestroy, IFormManager<Cuenta> {

  //#region Variables
  public user: any;
  public actionType: string;
  public form: FormGroup;
  public baseEntity = new Cuenta();
  public persona = new SegUsuario();
  public listaEstados: ComCatEstadoCuenta[] = [];
  //#endregion

  //#region Constructor
  constructor(private router: Router, private ctrlWebServiceService: CtrlWebServiceService, private formBuilder: FormBuilder,
              private storage: Storage, private comun: Comun, private extende: FormManagerExtender) {

  }
  //#endregion

  //#region Metodos IFormManager

  loadInformation(entity: Cuenta) {

  }
  setEntity() {
    return this.ctrlWebServiceService.getAll('api/Estado').then(res => {
      const respuesta = res.json();
      if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.Cero) {
        this.listaEstados = respuesta[EnumRequests.EntityList];
        console.log(this.listaEstados);
        this.comun.ctrGeneric.cerrarCargado();
      } else if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.Uno) {
        this.listaEstados = [];
        this.comun.ctrGeneric.cerrarCargado();
        this.comun.ctrGeneric.alertaInformativa(Resource.MES_OCURRIO_ERROR_INESPERADO);
      }
    });
  }

  getEntity() {

  }
  validateForm(): boolean {
    return true;
  }
  //#endregion

  //#region Metodo IONIC
  ngOnInit() {
    this.form = this.validForm();
    this.storage.get('cuenta').then((val) => {
      if (!isNullOrUndefined(val)) {
        // Agregar
        this.baseEntity = val;
      }
      this.extende.initializeComponent<Cuenta>(this, val);
      console.log('cuenta', val);
    }).catch(e => this.comun.ctrGeneric.mostrarError(e));

    this.storage.get('persona').then((val) => {
      if (!isNullOrUndefined(val)) {
        // Agregar
        this.persona = val;
      }
      console.log('persona', val);
    }).catch(e => this.comun.ctrGeneric.mostrarError(e));
  }

  ngOnDestroy() {
    this.storage.remove('cuenta');
  }
  //#endregion

  //#region Metodos Genericos
  aceptar() {
    // this.comun.ctrGeneric.mostrarCargando();
    console.log('cmbEstado', this.form.get('cmbEstado').value);
    this.baseEntity.idComCatEstadoCuenta = Number(this.form.get('cmbEstado').value);
    this.baseEntity.idComPersona = this.persona.id;
    this.baseEntity.curSaldo = Number(this.baseEntity.curSaldo);
    if (isNullOrUndefined(this.baseEntity.id)) {

      this.ctrlWebServiceService.create(this.baseEntity, 'api/Cuenta').then(res => {
        const respuesta = res.json();
        if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.Cero) {
          this.comun.ctrGeneric.alertaInformativa(Resource.MES_OPERACION_EXITO_GUARDAR);
          this.comun.ctrGeneric.cerrarCargado();
          this.router.navigate([EnumSegModulo.CuentaPrincipal]);
        } else if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.Uno) {
          this.comun.ctrGeneric.alertaInformativa(respuesta[EnumRequests.Message]);
        } else if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.MenosUno) {
          this.comun.ctrGeneric.alertaInformativa(Resource.MES_OCURRIO_ERROR_INESPERADO);
        }
      });

    } else {

      this.ctrlWebServiceService.update(this.baseEntity, 'api/Cuenta').then(res => {
        console.log(this.baseEntity);
        const respuesta = res.json();
        if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.Cero) {
          this.comun.ctrGeneric.alertaInformativa(Resource.MES_OPERACION_EXITO_EDITAR);
          this.comun.ctrGeneric.cerrarCargado();
          this.router.navigate([EnumSegModulo.CuentaPrincipal]);
        } else if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.Uno) {
          this.comun.ctrGeneric.alertaInformativa(respuesta[EnumRequests.Message]);
        } else if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.MenosUno) {
          this.comun.ctrGeneric.alertaInformativa(Resource.MES_OCURRIO_ERROR_INESPERADO);
        }
      });

    }

  }
  registro2(form: NgForm) {
    console.log(form);
  }
  //#endregion


  //#region Validaciones
  private validForm() {
    return this.formBuilder.group({
      txtNumeroCuenta: ['', this.comun.ctrlValidate.OnlyNumersRequired()],
      txtSaldo: ['', this.comun.ctrlValidate.OnlyNumersRequired()],
      txtPin: ['', this.comun.ctrlValidate.OnlyNumersRequired()],
      cmbEstado: ['', this.comun.ctrlValidate.Required()],
    });
  }

  //#endregion


}
