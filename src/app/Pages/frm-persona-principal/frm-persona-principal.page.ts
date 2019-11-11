import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CtrlWebServiceService } from '../../Services/ctrl-web-service.service';
import { Comun } from '../../../Contol/Comun';
import { ActionSheetController } from '@ionic/angular';
import { SegUsuario } from '../../Shared/Entity/SegUsuario';
import { IFormMainModule } from 'src/app/Interfaces/IFormMainModule';
import { EnumSegModulo } from '../../Shared/Enum/SegModulo';
import { Storage } from '@ionic/storage';
import { async } from '@angular/core/testing';
import { EnumNumericValue } from '../../Shared/Enum/EnumNumericValue';
import { EnumRequests } from '../../Shared/Enum/EnumRequest';
import { Resource } from '../../../Contol/Resources/Resources';

@Component({
  selector: 'app-frm-persona-principal',
  templateUrl: './frm-persona-principal.page.html',
  styleUrls: ['./frm-persona-principal.page.scss'],
})
export class FrmPersonaPrincipalPage implements OnInit, IFormMainModule<any> {

  private botones: any = [];
  private baseEntity: SegUsuario;
  public items: SegUsuario[] = [];

  constructor(private router: Router, private ctrlWebServiceService: CtrlWebServiceService,
    public actionSheetCtrl: ActionSheetController, private storage: Storage, private comun: Comun) {
  }

  ngOnInit() {
    this.showActionPane('', '');
    this.showRows();
  }

  //#region Mostrar SubMenus
  public async showSubMenus() {
    if (this.botones.length > EnumNumericValue.Uno) {
      const actionSheet = await this.actionSheetCtrl.create({
        header: 'Acciones Extra',
        cssClass: 'action-sheets-basic-page',
        buttons: this.botones
      });
      actionSheet.present();
    }
  }
  //#endregion


  //#region Metodos de IFormMainModule

  async action(entity) {
    // obtener la accion del nombre del boton
    console.log(entity)
    this.baseEntity = entity;
    this.editItem();
  }

  async delete(entity) {
    // obtener la accion del nombre del boton
    console.log(entity)
    this.ctrlWebServiceService.delete(entity, 'api/Persona').then(() => {
      this.showRows();
  });
  }

  showActionPane(module: string, segUsuario: any) {

    this.botones.push({
      text: 'Cancelar', role: 'cancel', icon: 'close'
    });

    // obtener los permisos que trae el usuario y dependiendo
    // se agregaran las acciones

    // if (this.permisos.BitConsultar == 1) {
    this.botones.push({
      text: 'Detalles', icon: 'eye',
      handler: () => { this.editItem(); }
    });
    // } if (this.permisos.BitEditar == 1) {
    this.botones.push({
      text: 'Editar', icon: 'share',
      handler: () => { this.editItem(); }
    });
    // } if (this.permisos.BitEliminar == 1) {
    this.botones.push({
      text: 'Eliminar', role: 'destructive', icon: 'arrow-dropright-circle',
      handler: () => { this.editItem(); }
    });
    // } if (this.permisos.BitImprimir == 1) {
    this.botones.push({
      text: 'imprimir', icon: 'heart',
      handler: () => { this.editItem(); }
    });
    // }
  }

  showRows() {
    return this.ctrlWebServiceService.getAll('api/Persona').then(res => {
      let respuesta = res.json();
      if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.Cero) {
        this.items = respuesta[EnumRequests.EntityList];
        this.comun.ctrGeneric.cerrarCargado();
      } else if (respuesta[EnumRequests.StatusCode] === EnumNumericValue.Uno) {
        this.items = null;
        this.comun.ctrGeneric.cerrarCargado();
        this.comun.ctrGeneric.alertaInformativa(Resource.MES_OCURRIO_ERROR_INESPERADO);
      }
    });
    // for (let i = 0; i < 2; i++) {
    //   this.items.push(this.comun.globalVariable.usuario);
    // }
  }
  //#endregion

  //#region Refresh datos
  doRefresh(event) {
    this.showRows().then(() => { event.target.complete(); });
  }
  //#endregion

  private editItem() {
    this.storage.set('persona', this.baseEntity).then(() => { this.router.navigate([EnumSegModulo.Persona]); }
    );
  }

}
