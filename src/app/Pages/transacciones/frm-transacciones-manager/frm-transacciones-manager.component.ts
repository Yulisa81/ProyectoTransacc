import { Component, OnInit, OnDestroy } from '@angular/core';
import { IFormManager } from 'src/app/Interfaces/IFormManager';
import { Transaccion } from 'src/app/Shared/Entity/Transaccion';
import { Router } from '@angular/router';
import { CtrlWebServiceService } from 'src/app/Services/ctrl-web-service.service';
import { FormBuilder, NgForm, FormGroup } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { Comun } from 'src/Contol/Comun';
import { FormManagerExtender } from 'src/app/Shared/Extender/FormManagerExtender';
import { isNullOrUndefined } from 'util';
import { SegUsuario } from 'src/app/Shared/Entity/SegUsuario';
import { EnumRequests } from 'src/app/Shared/Enum/EnumRequest';
import { EnumNumericValue } from 'src/app/Shared/Enum/EnumNumericValue';
import { Resource } from 'src/Contol/Resources/Resources';
import { EnumSegModulo } from 'src/app/Shared/Enum/SegModulo';

@Component({
  selector: 'app-frm-transacciones-manager',
  templateUrl: './frm-transacciones-manager.component.html',
  styleUrls: ['./frm-transacciones-manager.component.scss'],
})
export class FrmTransaccionesManagerComponent implements OnInit, OnDestroy, IFormManager<Transaccion> {
  form: FormGroup;
  user: any;
  baseEntity: Transaccion;
  actionType: string;
  loadInformation(entity: Transaccion) {
    throw new Error("Method not implemented.");
  }
  setEntity() {
    throw new Error("Method not implemented.");
  }
  getEntity() {
    throw new Error("Method not implemented.");
  }
  validateForm(): boolean {
    return true;
  }
  ngOnDestroy(): void {
    this.storage.remove('Transacción');
  }

  constructor(private router: Router, private ctrlWebService: CtrlWebServiceService, private formBuilder: FormBuilder,
    public actionSheetCtrl: ActionSheetController, private storage: Storage, private comun: Comun, private extende: FormManagerExtender) { }

  ngOnInit() {
    this.form = this.validForm();
    this.storage.get('Transacción').then((val) => {
      if (!isNullOrUndefined(val)) {
        //Agregar
        this.baseEntity = val;
      }
      this.extende.initializeComponent<SegUsuario>(this, val);
      console.log('Transacción', val);
    }).catch(e => this.comun.ctrGeneric.mostrarError(e));
  }

  private aceptar() {
    console.log(this.baseEntity);
    this.comun.ctrGeneric.mostrarCargando();
    if (isNullOrUndefined(this.baseEntity.id)) {
      this.ctrlWebService.create(this.baseEntity, 'api/Transacciones').then(res => {
        const respuesta = res.json();
        if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.Cero) {
          this.comun.ctrGeneric.alertaInformativa(Resource.MES_OPERACION_EXITO_GUARDAR);
          this.comun.ctrGeneric.cerrarCargado();
          this.router.navigate([EnumSegModulo.Transacciones]);
        } else if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.Uno) {
          this.comun.ctrGeneric.alertaInformativa(respuesta[EnumRequests.Message]);
        } else if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.MenosUno) {
          this.comun.ctrGeneric.alertaInformativa(Resource.MES_OCURRIO_ERROR_INESPERADO);
        }
      });
    } else {
      this.ctrlWebService.update(this.baseEntity, 'api/Transacciones').then(res => {
        const respuesta = res.json();
        if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.Cero) {
          this.comun.ctrGeneric.alertaInformativa(Resource.MES_OPERACION_EXITO_EDITAR);
          this.comun.ctrGeneric.cerrarCargado();
          this.router.navigate([EnumSegModulo.PersonaPrincipal]);
        } else if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.Uno) {
          this.comun.ctrGeneric.alertaInformativa(respuesta[EnumRequests.Message]);
        } else if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.MenosUno) {
          this.comun.ctrGeneric.alertaInformativa(Resource.MES_OCURRIO_ERROR_INESPERADO);
        }
      });
    }
  }

  private registro2(form: NgForm) {
    console.log(form);
  }

  private validForm() {
    return this.formBuilder.group({
      txtNombreDestinatario: ['', this.comun.ctrlValidate.Required()],
      txtCuentaDestinatario: ['', this.comun.ctrlValidate.Required()],
      txtFechaTransaccion: ['', this.comun.ctrlValidate.Required()],
      txtPIN: ['', this.comun, this.comun.ctrlValidate.OnlyNumersRequired()],
      txtMontoEnviar: ['', this.comun.ctrlValidate.OnlyNumersRequired()]
    });
  }
}
