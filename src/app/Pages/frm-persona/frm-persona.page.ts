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
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { IFormManager } from '../../Interfaces/IFormManager';
import { FormManagerExtender } from '../../Shared/Extender/FormManagerExtender';

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
    this.extende.initializeComponent(this, this.baseEntity);
    this.storage.get('persona').then((val) => {
      if (!isNullOrUndefined(val)) {
        this.baseEntity = val;
      }
      console.log('persona', val);
    });
  }

  ngOnDestroy() {
    this.storage.remove('persona');
  }
  //#endregion

  //#region Metodos Genericos
  login() {
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
    });
  }

  //#endregion

}
