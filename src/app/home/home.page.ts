import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Comun } from '../../Contol/Comun';
import { Persona } from '../Shared/Entity/Persona';
import { SegUsuario } from '../Shared/Entity/SegUsuario';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  //#region Variables
  public user = new SegUsuario();
  //#endregion

  constructor(public menuCtrl: MenuController, private comun: Comun) {
  }

  async ngOnInit() {
    this.menuCtrl.enable(true);
    this.user = this.comun.globalVariable.usuario;
  }

}
