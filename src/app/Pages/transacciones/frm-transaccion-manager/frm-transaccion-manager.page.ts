import { Component, OnInit, OnDestroy } from '@angular/core';
import { IFormManager } from 'src/app/Interfaces/IFormManager';
import { Transaccion } from 'src/app/Shared/Entity/Transaccion';
import { CtrlWebServiceService } from 'src/app/Services/ctrl-web-service.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ActionSheetController } from '@ionic/angular';
import { Comun } from 'src/Contol/Comun';
import { FormManagerExtender } from 'src/app/Shared/Extender/FormManagerExtender';
import { FormBuilder, NgForm, FormGroup, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { SegUsuario } from 'src/app/Shared/Entity/SegUsuario';
import { EnumRequests } from 'src/app/Shared/Enum/EnumRequest';
import { EnumNumericValue } from 'src/app/Shared/Enum/EnumNumericValue';
import { EnumSegModulo } from 'src/app/Shared/Enum/SegModulo';
import { Resource } from 'src/Contol/Resources/Resources';
import { Cuenta } from 'src/app/Shared/Entity/Cuenta';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-frm-transaccion-manager',
  templateUrl: './frm-transaccion-manager.page.html',
  styleUrls: ['./frm-transaccion-manager.page.scss'],
})
export class FrmTransaccionManagerPage implements OnInit, OnDestroy, IFormManager<Transaccion> {
  public form: FormGroup;
  public user: SegUsuario;
  public baseEntity = new Transaccion();
  private listaPersonas: SegUsuario[];
  public actionType: string;
  private fechaActual: Date;
  loadInformation(entity: any) {
  }

  async setEntity() {
    // Obtener Información para los combos.
    this.listaPersonas = await this.obtenerPersonas().then(res => {
      const respuesta = res.json();
      if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.Cero) {
        return respuesta[EnumRequests.EntityList];
      }
    });
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
    // Obtener Información del usuario.
    this.user = this.comun.globalVariable.usuario;
    this.storage.get('Transacción').then((val) => {
      if (!isNullOrUndefined(val)) {
        this.actionType = 'Editar';
        this.baseEntity = val;
      }
      this.extende.initializeComponent<Transaccion>(this, val);
      console.log('Transacción', val);
      this.actionType = 'Agregar';
      this.fechaActual = new Date();
    }).catch(e => this.comun.ctrGeneric.mostrarError(e));
  }

  private aceptar(postObj: any) {
    if (!this.validarTransaccion(postObj)) { return; }
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
      txtNombreDestinatario: ['', Validators.required],
      cmbPersonaDestino: ['', Validators.required],
      txtCuentaOrigen: ['', Validators.required, Validators.maxLength(13)],
      txtCuentaDestinatario: ['', Validators.required, Validators.maxLength(13)],
      dteFechaTransaccion: ['', Validators.required],
      txtPIN: ['', Validators.required, Validators.maxLength(4)],
      txtMontoEnviar: [0, Validators.required, Validators.maxLength(13)]
    });
  }

  private async obtenerPersonas() {
    return this.ctrlWebService.getAll('api/Persona');
  }

  private async obtenerCuentasPersona(usuario: SegUsuario) {
    return this.ctrlWebService.getById(usuario, 'api/Cuenta');
  }

  private async validarTransaccion(postObj: any) {
    // OBTIENE LAS CUENTAS DE LOS USUARIOS(EMISOR Y RECEPTOR)
    const cuentasPersonales: Cuenta[] = await this.obtenerCuentasPersona(this.user).then(res => {
      const response = res.json();
      return response[EnumRequests.EntityList];
    });
    const cuentasDestinatario: Cuenta[] = await this.obtenerCuentasPersona(postObj.txtCuentaDestinatario).then(res => {
      const response = res.json();
      return response[EnumRequests.EntityList];
    });
    // OBTIENE LAS CUENTAS CORRESPONDIENTES SPECIFICADAS (EMISOR Y RECEPTOR)
    const cuentaSelecUser = cuentasPersonales.find( el => el.strNumCuenta === postObj.txtCuentaOrigen);
    const cuentaSelecDest = cuentasDestinatario.find(el => el.strNumCuenta === postObj.txtCuentaDestinatario);
    // VERIFICA QUE EXISTAN DICHAS CUENTAS (EMISOR Y RECEPTOR)
    if (isNullOrUndefined(cuentaSelecUser)) {return false; }
    if (isNullOrUndefined(cuentaSelecDest)) {return false; }
    // VERIFICA QUE LA CUENTA ORIGEN TENGA SALDO SUFICIENTE AL ENVIADO
    if (postObj.txtMontoEnviar > cuentaSelecUser.curSaldo) { return false; }
    // VERIFICA QUE EL PIN INGRESADO CORRESPONDA A LA CUENTA SELECCIONADA
    if (postObj.txtPIN !== cuentaSelecUser.strPin) { return false; }
    // REALIZA LAS ASIGNACIONES A LA TRANSACCIÓN
    if (this.baseEntity.id === 0) {
      // AGREGAR
      this.baseEntity.idComCatEstadoTransaccion = 1; // Activo.
      this.baseEntity.idComCuentaEmisor = cuentaSelecUser.id;
      this.baseEntity.idComCuentaReceptor = cuentaSelecDest.id;
    } else {
      // EDITAR
    }
  }

}
