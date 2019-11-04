import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SegUsuario } from 'src/app/Shared/SegUsuario';
import { CtrlInternetAccessService } from 'src/app/Services/ctrl-internet-access.service';
import { CtrlWebServiceService } from 'src/app/Services/ctrl-web-service.service';
import { MenuController } from '@ionic/angular';
import { CtrlValidator } from '../../../Contol/CtrlValidator';
import { CtrlGenericInstance } from '../../../Contol/CtrlGenericInstance';
import { Persona } from '../../Shared/Persona';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-frm-login',
  templateUrl: './frm-login.page.html',
  styleUrls: ['./frm-login.page.scss'],
})
export class FrmLoginPage extends CtrlInternetAccessService implements OnInit {

  public myForm: FormGroup;
  // public usuario = new SegUsuario();
  public usuario = new Persona();
  public disabled = true;
  private ctrlValidator = new CtrlValidator();

  constructor(private router: Router, private formBuilder: FormBuilder,
    public menuCtrl: MenuController, private ctrlWebServiceService: CtrlWebServiceService,
    private ctrlGenericInstance: CtrlGenericInstance) {
    super()
    this.myForm = this.validForm();
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }


  async login() {

    await this.ctrlGenericInstance.mostrarCargando();
    if (this.checkInternetConnection()) {
      console.log("TIENE CONEXION");
    } else {
      console.log("NO TIENE CONEXION");
    }
   /// this.ctrlWebServiceService.getById(consulta.Modelo, "")
     
    // this.ctrlWebServiceService.getById(consulta.Modelo, "").then((response)=> {
    //  this.router.navigate(['frm-principal']);

    // });

    this.ctrlWebServiceService.create(this.usuario, 'api/Login').then(res => {

      let status = res.json();
      console.log(res)
      console.log(status["StatusCode"]);

      if (status["StatusCode"] === 0) {
        this.router.navigate(['home']);

      }
      // this.storage.set('name', t["Entity"]);
    }).catch(e => this.mostrarError(e));
 
  }


  private mostrarError(error) {
    switch (error.constructor) {
      case Error:
        this.ctrlGenericInstance.cerrarCargado();
        this.ctrlGenericInstance.alertaInformativa(error.message);
        console.log('generic');
        break;
      case RangeError:
        console.log('range');
        break;
      default:
        console.log('unknown');
        break;
    }
  }

  private validForm() {
    return this.formBuilder.group({
      txtUsuario: ['',  this.ctrlValidator.OnlyLettersRequired()],
      txtPassword: ['', this.ctrlValidator.OnlyNumersRequired()]

    });
  }

  saveData() {

    alert(JSON.stringify(this.myForm.value));
  }
  public change() {
    this.disabled = !this.disabled;
  }
}
