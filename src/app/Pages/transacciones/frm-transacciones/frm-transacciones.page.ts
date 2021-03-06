import { Component, OnInit } from '@angular/core';
import { CtrlWebServiceService } from 'src/app/Services/ctrl-web-service.service';
import { Transaccion } from 'src/app/Shared/Entity/Transaccion';
import { IFormMainModule } from 'src/app/Interfaces/IFormMainModule';
import { SegUsuario } from 'src/app/Shared/Entity/SegUsuario';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Comun } from 'src/Contol/Comun';
import { EnumRequests } from 'src/app/Shared/Enum/EnumRequest';
import { EnumNumericValue } from 'src/app/Shared/Enum/EnumNumericValue';
import { Resource } from 'src/Contol/Resources/Resources';
import { EnumSegModulo } from 'src/app/Shared/Enum/SegModulo';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-frm-transacciones',
  templateUrl: './frm-transacciones.page.html',
  styleUrls: ['./frm-transacciones.page.scss'],
})
export class FrmTransaccionesPage implements OnInit, IFormMainModule<Transaccion> {

  private botones: any = [];
  private baseEntity: Transaccion;
  public items: Transaccion[] = [];
  transaccion: Transaccion;
  curUser: SegUsuario;

  async action(entity: Transaccion): Promise<void> {
    console.log(entity);
    this.baseEntity = entity;
    this.editar();
  }

  async delete(entity) {
    // LAS TRANSACCIONES NO SE DEBEN ELIMINAR.
    console.log(entity);
    const res = await this.confirmarEliminar();
    if (res) {
      this.ctrlWebServiceService.delete(entity, 'api/Transacciones').then(() => {
        this.showRows();
      });
    }
  }

  showActionPane(module: string, segUsuario: any): void {
    // NO SE DEBE IMPLEMENTAR AQUI.
  }

  showRows() {
    return this.ctrlWebServiceService.getById(this.curUser, 'api/TransaccionesPersona').then(res => {
      const respuesta = res.json();
      if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.Cero) {
        this.items = respuesta[EnumRequests.EntityList];
        this.comun.ctrGeneric.cerrarCargado();
      } else if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.Uno) {
        this.items = null;
        this.comun.ctrGeneric.cerrarCargado();
        this.comun.ctrGeneric.alertaInformativa(Resource.MES_OCURRIO_ERROR_INESPERADO);
      }
    });
  }

  doRefresh(event) {
    this.showRows().then(() => { event.target.complete(); });
  }

  private editar() {
    this.storage.set('Transacción', this.baseEntity).then(() => { this.router.navigate([EnumSegModulo.Transacciones_Manager]); }
    );
  }

  private cuentas() {
    this.router.navigate([EnumSegModulo.CuentaPrincipal]);
  }

  async confirmarEliminar() {
    return new Promise(async (resolve) => {
      const confirm = await this.alertController.create({
        header: 'Transact App',
        message: '¿Realmente deseas eliminar registro?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              return resolve(false);
            },
          },
          {
            text: 'OK',
            handler: () => {
              return resolve(true);
            },
          },
        ],
      });
      confirm.present();
    });
  }

  constructor(private router: Router, private ctrlWebServiceService: CtrlWebServiceService,
              public actionSheetCtrl: ActionSheetController, private storage: Storage, private comun: Comun,
              private alertController: AlertController) {
    if (isNullOrUndefined(this.comun.globalVariable.usuario)) {
      console.log('No se obtuvo el usuario global.');
    } else {
      this.curUser = this.comun.globalVariable.usuario;
    }
  }

  ngOnInit() {
    this.showRows();
  }

}
