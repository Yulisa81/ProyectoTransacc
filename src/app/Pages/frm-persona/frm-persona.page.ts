import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonItemSliding, AlertController, ActionSheetController } from '@ionic/angular';
import { Persona } from 'src/app/Shared/Entity/Persona';
import { CtrlWebServiceService } from 'src/app/Services/ctrl-web-service.service';
import { IFormMainModule } from '../../Interfaces/IFormMainModule';
import { Comun } from '../../../Contol/Comun';
import { SegUsuario } from '../../Shared/Entity/SegUsuario';
import { Router } from '@angular/router';
import { EnumSegModulo } from '../../Shared/Enum/SegModulo';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { isNullOrUndefined, isNull } from 'util';
import { IFormManager } from '../../Interfaces/IFormManager';
import { FormManagerExtender } from '../../Shared/Extender/FormManagerExtender';
import { EnumRequests } from '../../Shared/Enum/EnumRequest';
import { EnumNumericValue } from '../../Shared/Enum/EnumNumericValue';
import { Resource } from '../../../Contol/Resources/Resources';

@Component({
  selector: 'app-frm-persona',
  templateUrl: './frm-persona.page.html',
  styleUrls: ['./frm-persona.page.scss'],
})

export class FrmPersonaPage implements OnInit, OnDestroy, IFormManager<SegUsuario> {

  //#region Variables
  public user: any;
  public actionType: string;
  public form: FormGroup;
  public baseEntity = new SegUsuario();
  //#endregion

  //#region Constructor
  constructor(private router: Router, private ctrlWebServiceService: CtrlWebServiceService, private formBuilder: FormBuilder,
    public actionSheetCtrl: ActionSheetController, private storage: Storage, private comun: Comun, private extende: FormManagerExtender) {

  }
  //#endregion

  //#region Metodos IFormManager

  loadInformation(entity: SegUsuario) {

  }
  setEntity() {

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
    this.storage.get('persona').then((val) => {
      if (!isNullOrUndefined(val)) {
        // Agregar
        this.baseEntity = val;
      }
      this.extende.initializeComponent<SegUsuario>(this, val);
      console.log('persona', val);
    }).catch(e => this.comun.ctrGeneric.mostrarError(e));
  }

  ngOnDestroy() {
    this.storage.remove('persona');
  }
  //#endregion

  //#region Metodos Genericos
  aceptar() {
    console.log(this.baseEntity);
    this.comun.ctrGeneric.mostrarCargando();

    if (isNullOrUndefined(this.baseEntity.id)) {

      this.ctrlWebServiceService.create(this.baseEntity, 'api/Persona').then(res => {
        let respuesta = res.json();
        if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.Cero) {
          this.comun.ctrGeneric.alertaInformativa(Resource.MES_OPERACION_EXITO_GUARDAR);
          this.comun.ctrGeneric.cerrarCargado();
        } else if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.Uno) {
          this.comun.ctrGeneric.alertaInformativa(respuesta[EnumRequests.Message]);
        } else if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.MenosUno) {
          this.comun.ctrGeneric.alertaInformativa(Resource.MES_OCURRIO_ERROR_INESPERADO);
        }
      });

    } else {

      this.ctrlWebServiceService.update(this.baseEntity, 'api/Persona').then(res => {
        let respuesta = res.json();
        if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.Cero) {
          this.comun.ctrGeneric.alertaInformativa(Resource.MES_OPERACION_EXITO_EDITAR);
          this.comun.ctrGeneric.cerrarCargado();
        } else if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.Uno) {
          this.comun.ctrGeneric.alertaInformativa(respuesta[EnumRequests.Message]);
        } else if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.MenosUno) {
          this.comun.ctrGeneric.alertaInformativa(Resource.MES_OCURRIO_ERROR_INESPERADO);
        }
      });

    }

  }
  registro2(form: NgForm) {
    console.log(form)
  }
  //#endregion


  //#region Validaciones
  private validForm() {
    return this.formBuilder.group({
      txtNombre: ['', this.comun.ctrlValidate.Required()],
      txtAPaterno: ['', this.comun.ctrlValidate.Required()],
      txtAMaterno: ['', this.comun.ctrlValidate.Required()],
      txtCurp: ['', this.comun.ctrlValidate.Required()],
      txtCorreo: ['', this.comun.ctrlValidate.Required()],
      txtFechaNacimiento: ['', this.comun.ctrlValidate.Required()],
      txtUsuario: ['', this.comun.ctrlValidate.Required()],
      txtPassword: ['', this.comun.ctrlValidate.Required()],
    });
  }

  //#endregion

}
