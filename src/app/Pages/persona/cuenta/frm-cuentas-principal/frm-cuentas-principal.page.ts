import { Component, OnInit } from '@angular/core';
import { Cuenta } from 'src/app/Shared/Entity/Cuenta';
import { IFormMainModule } from '../../../../Interfaces/IFormMainModule';
import { Router } from '@angular/router';
import { CtrlWebServiceService } from '../../../../Services/ctrl-web-service.service';
import { Comun } from '../../../../../Contol/Comun';
import { EnumNumericValue } from '../../../../Shared/Enum/EnumNumericValue';
import { EnumRequests } from '../../../../Shared/Enum/EnumRequest';
import { Resource } from '../../../../../Contol/Resources/Resources';
import { EnumSegModulo } from '../../../../Shared/Enum/SegModulo';
import { Storage } from '@ionic/storage';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Persona } from 'src/app/Shared/Entity/Persona';

@Component({
  selector: 'app-frm-cuentas-principal',
  templateUrl: './frm-cuentas-principal.page.html',
  styleUrls: ['./frm-cuentas-principal.page.scss'],
})
export class FrmCuentasPrincipalPage implements OnInit, IFormMainModule<Cuenta> {

  private botones: any = [];
  private baseEntity: Cuenta;
  public items: Cuenta[] = [];

  constructor(private router: Router, private ctrlWebServiceService: CtrlWebServiceService,
              private storage: Storage, private comun: Comun, public actionSheetCtrl: ActionSheetController, 
              private alertController: AlertController) {
  }

  ngOnInit() {
    this.showActionPane('', '');
    this.storage.get('persona').then((entity) => {
    this.baseEntity = entity;
    this.showRows();
    });
  }

  //#region Mostrar SubMenus
  public async showSubMenus(entity) {
    console.log(entity)
    if (this.botones.length > EnumNumericValue.Uno) {
      this.storage.set('cuenta', entity).then(async () => {
        const actionSheet = await this.actionSheetCtrl.create({
          header: 'Acciones Extra',
          cssClass: 'action-sheets-basic-page',
          buttons: this.botones
        });
        actionSheet.present();
      });
    }
  }
  //#endregion


  //#region Metodos de IFormMainModule

  async action(entity) {
    // obtener la accion del nombre del boton
    console.log(entity)
    this.baseEntity = entity;
    this.editar();
  }

  async delete(entity) {
    // obtener la accion del nombre del boton
    console.log(entity)
    /*/this.ctrlWebServiceService.delete(entity, 'api/Cuenta').then(() => {
      this.showRows();
    });*/
    const res = await this.confirmarEliminar();
    if (res) {
      this.ctrlWebServiceService.delete(entity, 'api/Cuenta').then(() => {
        this.showRows();
      });
    }
  }

  /**
   * Metodo para mostrar las acciones que tiene permitido
   * el usuario hacia otros mudulos relacionados
   * @param module
   * @param segUsuario
   */
  showActionPane(module: string, segUsuario: any) {

    this.botones.push({
      text: 'Cancelar', role: 'cancel', icon: 'close'
    });
  }

  showRows() {

    return this.ctrlWebServiceService.getById(this.baseEntity,'api/Cuenta').then(res => {
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
  //#endregion

  //#region Refresh datos
  doRefresh(event) {
    this.storage.get('persona').then((entity) => {
    this.baseEntity = entity;
    this.showRows().then(() => { event.target.complete(); });
    });
}
  //#endregion

  //#region Metodos de acciones

  private editar() {
    this.storage.set('cuenta', this.baseEntity).then(() => { this.router.navigate([EnumSegModulo.Cuenta]); }
    );
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
  //#endregion

}
