import { Component, OnInit, OnDestroy } from '@angular/core';
import { IFormManager } from 'src/app/Interfaces/IFormManager';
import { Transaccion } from 'src/app/Shared/Entity/Transaccion';
import { CtrlWebServiceService } from 'src/app/Services/ctrl-web-service.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ActionSheetController } from '@ionic/angular';
import { Comun } from 'src/Contol/Comun';
import { FormManagerExtender } from 'src/app/Shared/Extender/FormManagerExtender';
import { FormBuilder, NgForm, FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { SegUsuario } from 'src/app/Shared/Entity/SegUsuario';
import { EnumRequests } from 'src/app/Shared/Enum/EnumRequest';
import { EnumNumericValue } from 'src/app/Shared/Enum/EnumNumericValue';
import { EnumSegModulo } from 'src/app/Shared/Enum/SegModulo';
import { Resource } from 'src/Contol/Resources/Resources';

@Component({
  selector: 'app-frm-transaccion-manager',
  templateUrl: './frm-transaccion-manager.page.html',
  styleUrls: ['./frm-transaccion-manager.page.scss'],
})
export class FrmTransaccionManagerPage implements OnInit, OnDestroy, IFormManager<Transaccion> {
  public form: FormGroup;
  public user: any;
  public baseEntity = new Transaccion();
  private listaPersonas: SegUsuario[];
  public actionType: string;
  loadInformation(entity: any) {
  }
  async setEntity() {
    // Obtener Información para los combos.
    this.listaPersonas = await this.obtenerPersonas();
  }
  getEntity() {
  }
  validateForm(): boolean {
    return true;
  }
  ngOnDestroy(): void {
    this.storage.remove('transacción');
  }

  constructor(private router: Router,
              private ctrlWebService: CtrlWebServiceService,
              private formBuilder: FormBuilder,
              public actionSheetCtrl: ActionSheetController,
              private storage: Storage,
              private comun: Comun,
              private extende: FormManagerExtender) { }

  ngOnInit() {
    this.form = this.validForm();
    this.storage.get('Transacción').then((val) => {
      if (!isNullOrUndefined(val)) {
        this.actionType = 'Editar';
        this.baseEntity = val;
      }
      this.extende.initializeComponent<Transaccion>(this, val);
      console.log('Transacción', val);
      this.actionType = 'Agregar';
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

  private async obtenerPersonas(){
    return this.ctrlWebService.getAll('api/Persona');
  }

}
